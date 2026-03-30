'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function Home() {
  const [filePreview, setFilePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // ✅ Handle dropped files
  const onDrop = useCallback((acceptedFiles) => {
    setValue('file', acceptedFiles);

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setFilePreview({ url: previewUrl, name: file.name, type: file.type });
      } else if (file.type === 'application/pdf') {
        setFilePreview({ name: file.name, type: file.type });
      } else {
        setFilePreview(null);
      }
    }
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': []
    },
    maxFiles: 1
  });

  // ✅ Submit handler - sends file to Express backend
  const onSubmit = async (data) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('name', data.name || '');

      console.log('Uploading:', data.file[0].name, '|', data.file[0].type);

      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentage);
        }
      });

      setUploadResult({
        success: true,
        message: 'File uploaded successfully!',
        data: response.data
      });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        success: false,
        message: error.response?.data?.error || 'Upload failed'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">📁 File Upload</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name (optional)</label>
            <input
              {...register('name')}
              type="text"
              placeholder="Enter a name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Dropzone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
            >
              <input {...getInputProps()} />
              <input type="hidden" {...register('file', { required: 'Please select a file' })} />
              {isDragActive ? (
                <p className="text-blue-500 text-sm">Drop the file here...</p>
              ) : (
                <div>
                  <p className="text-4xl mb-2">☁️</p>
                  <p className="text-gray-500 text-sm">Drag & drop a file here, or click to browse</p>
                  <p className="text-gray-400 text-xs mt-1">Supports: JPEG, PNG, PDF — max 5MB</p>
                </div>
              )}
            </div>
            {errors.file && (
              <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
            )}
          </div>

          {/* File Preview */}
          {filePreview && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Preview:</h3>
              <div className="border rounded-lg p-2">
                {filePreview.type?.startsWith('image/') ? (
                  <img
                    src={filePreview.url}
                    alt={filePreview.name}
                    className="max-w-full h-auto max-h-40 rounded"
                  />
                ) : filePreview.type === 'application/pdf' ? (
                  <div className="py-2 px-3 bg-gray-100 rounded flex items-center gap-2">
                    <svg className="w-6 h-6 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                      <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                    <span className="text-sm text-gray-700">{filePreview.name}</span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">File selected: {filePreview.name}</div>
                )}
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Result */}
          {uploadResult && (
            <div className={`p-3 rounded-lg text-sm border ${
              uploadResult.success
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              <p className="font-medium">{uploadResult.message}</p>
              {uploadResult.success && uploadResult.data && (
                <ul className="mt-2 text-xs space-y-1">
                  <li>📄 <strong>File:</strong> {uploadResult.data.originalName}</li>
                  <li>📦 <strong>Size:</strong> {(uploadResult.data.size / 1024).toFixed(1)} KB</li>
                  <li>🔗 <strong>URL:</strong>{' '}
                    <a
                      href={`http://localhost:8000${uploadResult.data.url}`}
                      target="_blank"
                      className="underline"
                    >
                      View uploaded file
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>

        </form>
      </div>
    </main>
  );
}