# Practical 3 – File Upload Server

## Overview

This folder contains the backend file upload server for **WEB102 Practical 3: Implementing File Upload on the Server Application**. The practical focuses on building an Express server that can receive files from a React/Next.js frontend, validate the uploaded files, store them inside the backend `uploads` folder, and return useful upload information back to the client.

The server uses **Node.js**, **Express**, **Multer**, **CORS**, **Morgan**, and **dotenv**. It accepts only selected file types and includes a file size limit so that the upload process is safer and easier to control.

## Practical Objectives

The main objectives of this practical were to:

- Set up a basic Express backend server.
- Configure middleware for JSON parsing, request logging, CORS, and static file serving.
- Use Multer to handle `multipart/form-data` file uploads.
- Validate uploaded files by file type and file size.
- Create an upload API endpoint for the frontend.
- Return upload details such as filename, original name, MIME type, size, and file URL.
- Handle upload errors clearly.

## Folder Structure

```txt
Practical3-file-upload-server/
├── node_modules/
├── uploads/
├── .env
├── package.json
├── package-lock.json
└── server.js
```

> Note: `node_modules` is generated after installing dependencies. Normally, it should not be pushed to GitHub because it can be recreated using `npm install`.

## Technologies Used

| Technology / Package | Purpose |
|---|---|
| Node.js | Runtime environment for running JavaScript on the server |
| Express | Creates the backend server and API routes |
| Multer | Handles file upload data from forms |
| CORS | Allows the frontend and backend to communicate across different ports |
| Morgan | Logs HTTP requests in the terminal |
| dotenv | Loads environment variables from the `.env` file |
| fs / path | Creates and manages the local upload directory |

## Installation and Setup

Open the terminal inside the project folder:

```bash
cd Practical3-file-upload-server
```

Install the required dependencies:

```bash
npm install
```

Create or check the `.env` file:

```env
PORT=8000
FRONTEND_URL=http://localhost:3000
```

Run the backend server:

```bash
node server.js
```

Expected terminal output:

```txt
Server running on port 8000
```

## Server Configuration

The server is configured in `server.js`.

Main setup includes:

- Loading environment variables using `dotenv`.
- Creating an Express application.
- Setting the backend port using `process.env.PORT || 8000`.
- Creating an `uploads` directory if it does not already exist.
- Enabling CORS for the frontend URL.
- Parsing JSON request bodies.
- Logging requests using Morgan.
- Serving uploaded files using:

```js
app.use('/uploads', express.static(uploadDir));
```

This allows uploaded files to be accessed through a URL like:

```txt
http://localhost:8000/uploads/filename.pdf
```

## Multer File Upload Configuration

Multer is configured with `diskStorage`.

### Storage

The uploaded files are saved inside the local `uploads` directory. A timestamp is added to the original filename to reduce the chance of duplicate names.

Example filename:

```txt
1778860883755-example.pdf
```

### File Type Validation

The server accepts only these MIME types:

```txt
image/jpeg
image/png
application/pdf
```

If another file type is uploaded, the server rejects it and returns an error.

### File Size Limit

The maximum file size is:

```txt
5 MB
```

If the file is larger than 5 MB, the server returns a `413` response.

## API Endpoints

### 1. Test Server

```http
GET /
```

Purpose: Checks whether the backend server is running.

Example response:

```txt
File Upload Server is running
```

### 2. Upload File

```http
POST /api/upload
```

Purpose: Uploads a single file to the backend.

Request type:

```txt
multipart/form-data
```

Required field name:

```txt
file
```

Example request using `curl`:

```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@sample.pdf"
```

Example success response:

```json
{
  "message": "File uploaded successfully",
  "filename": "1778860883755-sample.pdf",
  "originalName": "sample.pdf",
  "mimetype": "application/pdf",
  "size": 204800,
  "url": "/uploads/1778860883755-sample.pdf"
}
```

## Error Handling

| Situation | Status Code | Example Response |
|---|---:|---|
| No file uploaded | 400 | `{ "error": "No file uploaded" }` |
| Invalid file type | 500 / 400 | `{ "error": "Invalid file type. Only JPEG, PNG and PDF files are allowed." }` |
| File too large | 413 | `{ "error": "File too large. Maximum size is 5MB." }` |
| Server error | 500 | `{ "error": "Server error" }` |

## Frontend Connection

The frontend should send the selected file to the backend endpoint:

```txt
http://localhost:8000/api/upload
```

The frontend should use a `FormData` object:

```js
const formData = new FormData();
formData.append('file', selectedFile);

await axios.post('http://localhost:8000/api/upload', formData);
```

The backend accepts requests from:

```txt
http://localhost:3000
```

This is controlled using the `FRONTEND_URL` environment variable.

## Testing Checklist

The implementation can be tested using Thunder Client, Postman, curl, or the connected frontend.

| Test | Expected Result |
|---|---|
| Open `http://localhost:8000/` | Shows that the file upload server is running |
| Upload a JPEG file | File uploads successfully |
| Upload a PNG file | File uploads successfully |
| Upload a PDF file | File uploads successfully |
| Upload an unsupported file type | Server returns an error |
| Upload a file larger than 5 MB | Server returns a file size error |
| Open the returned `/uploads/...` URL | Uploaded file is served from the backend |

## Suggested Screenshots for Report

| Screenshot | What to Capture |
|---|---|
| Server running | Terminal showing `Server running on port 8000` |
| Successful upload | Postman/Thunder Client showing `File uploaded successfully` |
| Uploads folder | The uploaded file saved inside the `uploads` directory |
| Invalid file test | Error response when uploading unsupported file type |
| File size test | Error response when uploading a file larger than 5 MB |
| Frontend upload | Browser showing successful upload from the React/Next.js form |

## Conclusion

This practical helped in understanding how backend servers handle file uploads. The Express server receives files from the frontend, Multer processes the multipart form data, validation rules check the uploaded file, and successful files are stored inside the server's upload directory. The practical also showed the importance of CORS, error handling, and clear API responses when connecting a frontend application to a backend upload server.
