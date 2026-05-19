# Reflection – Practical 3 File Upload Server

## Documentation

In this practical, I implemented a backend file upload server using Node.js and Express. The main purpose of the task was to create a server that can receive files from a React/Next.js frontend and store them safely in a backend folder. The server was built using Express for routing, Multer for handling file uploads, CORS for frontend-backend communication, Morgan for request logging, and dotenv for environment configuration.

The project uses a single main file, `server.js`, where the server configuration, middleware, Multer setup, upload route, and error handling are written. The uploaded files are stored in the `uploads` directory, and Express serves that directory statically so that uploaded files can be accessed later using their returned URL.

## Main Concepts Applied

### 1. Express Server Setup

I used Express to create the backend server and define routes. The root route `/` was added to check whether the server is working. The upload route `/api/upload` was created to receive files from the frontend.

### 2. Multipart Form Data

File upload requests are different from normal JSON requests because files are sent as `multipart/form-data`. I learned that the frontend must use a `FormData` object and append the file using the same field name expected by the backend.

In this project, the required field name is:

```txt
file
```

### 3. Multer Middleware

Multer was the main tool used for handling file uploads. It reads the incoming file from the request, stores it in the `uploads` folder, and provides file details through `req.file`.

The server uses Multer's `diskStorage` option to control:

- where files are saved,
- how filenames are created,
- which file types are accepted,
- and how large an uploaded file can be.

### 4. File Validation

The practical also focused on validation and security. I added validation so that only JPEG, PNG, and PDF files are accepted. This is important because accepting every file type can create security risks.

The accepted file types are:

```txt
image/jpeg
image/png
application/pdf
```

A file size limit of 5 MB was also added to prevent users from uploading very large files.

### 5. Static File Serving

After a file is uploaded, the server returns a file URL such as:

```txt
/uploads/filename.pdf
```

The `uploads` folder is served statically, meaning the uploaded file can be opened through the browser or frontend using the returned URL.

### 6. CORS Configuration

Since the frontend and backend run on different ports, CORS configuration was needed. The backend allows requests from the frontend URL stored in the `.env` file. This helped the React/Next.js frontend communicate with the Express backend without being blocked by the browser.

### 7. Error Handling

The server includes error handling for common upload problems such as:

- no file being uploaded,
- unsupported file type,
- file size being too large,
- and general server errors.

This made the API easier to test and understand because the server returns clear messages instead of crashing silently.

## What I Learned

Through this practical, I learned how file uploading works in a full-stack application. Before this, I mainly understood normal API requests that send JSON data. This task helped me understand that uploading files requires a different request format called `multipart/form-data`.

I also learned that Multer is useful because it handles most of the difficult file upload work. It can extract files from a request, store them in a folder, and provide useful information like filename, original name, MIME type, and file size.

Another important lesson was the need for validation. If file type and size are not checked, users might upload unsafe or extremely large files. By limiting file types and file size, the backend becomes more secure and reliable.

I also understood the importance of CORS when connecting a frontend and backend. Since the frontend usually runs on `localhost:3000` and the backend runs on `localhost:8000`, the browser needs permission from the backend before allowing the request.

## Challenges Faced and How I Solved Them

| Challenge | Explanation | Solution |
|---|---|---|
| Understanding `multipart/form-data` | Normal JSON requests cannot send actual file data properly. | I used `FormData` in the frontend and Multer in the backend. |
| Matching the field name | The backend expects the uploaded file under the field name `file`. | I made sure the frontend uses `formData.append('file', selectedFile)`. |
| CORS issue | The browser can block requests when frontend and backend run on different ports. | I configured CORS to allow the frontend URL from the `.env` file. |
| Upload folder not existing | If the `uploads` folder does not exist, files may not be saved correctly. | I used `fs.existsSync()` and `fs.mkdirSync()` to create the folder automatically. |
| Invalid file uploads | Users may upload unsupported files. | I used Multer `fileFilter` to accept only JPEG, PNG, and PDF files. |
| Large file uploads | Very large files can affect server performance. | I added a 5 MB file size limit and handled the error with a proper response. |

## Testing Reflection

I tested the backend by starting the server with:

```bash
node server.js
```

Then I checked the root route to confirm that the server was running. After that, I tested the upload endpoint by sending files to:

```txt
POST http://localhost:8000/api/upload
```

Successful tests returned a JSON response with the uploaded file details. Invalid tests, such as unsupported file types or files larger than 5 MB, returned error messages. This helped me confirm that both successful upload and error handling were working.

## Screenshots to Include

For the final submission, I would include screenshots of:

- the terminal showing the backend server running,
- a successful file upload response,
- the uploaded file saved in the `uploads` folder,
- an invalid file type error,
- a file size limit error,
- and the frontend successfully uploading a file to the backend.

## Personal Reflection

This practical was useful because it connected backend development with frontend file upload behavior. I learned that file uploads are not only about sending a file, but also about validating it, storing it correctly, handling errors, and sending a proper response back to the frontend.

I also realized that keeping upload logic organized is important. In this practical, everything is written in `server.js`, which is simple for learning. However, for a larger project, it would be better to separate the upload logic into routes, controllers, and middleware.

## Future Improvements

In the future, this project can be improved by:

- moving Multer configuration into a separate middleware file,
- creating a separate route file for upload endpoints,
- sanitizing filenames before saving them,
- storing file metadata in a database,
- adding authentication before allowing uploads,
- deleting unused files,
- and using cloud storage such as Supabase for better scalability.

## Conclusion

Overall, this practical helped me understand how to build a backend file upload system using Express and Multer. I learned how to process uploaded files, validate file type and size, store files in a local folder, serve uploaded files statically, and connect the backend with a frontend application. The most important learning from this practical was that file uploads require careful handling because they involve security, storage, validation, and user feedback.
