# Reflection: Practical 2 TikTok Server REST API

## Documentation

### Practical Summary

In this practical, I worked on the backend part of a TikTok-style application. The main task was to create a RESTful API using Node.js and Express.js. The API was designed to support the main features of a social media application, such as users, videos, comments, likes, followers, and following.

At first, the practical focused on setting up the Express backend and creating routes and controllers. Later, the server was also extended with database support, Prisma ORM, JWT authentication, and file upload middleware. This made the backend more realistic because the data is not only handled through route logic but can also be stored in a database.

### Main Concepts Applied

#### 1. Express Server Setup

I used Express.js to create the backend server. The server was configured in `src/app.js`, while `src/index.js` was used as the entry point to start the server. This separation made the project easier to understand because one file focuses on app configuration and the other focuses on running the server.

#### 2. RESTful API Design

The API was designed around resources such as:

- Users
- Videos
- Comments
- Likes
- Followers
- Following

Each resource was given suitable endpoints using HTTP methods like:

| Method | Purpose |
|---|---|
| `GET` | Retrieve data |
| `POST` | Create new data |
| `PUT` | Update existing data |
| `DELETE` | Delete data |

This helped me understand that REST API design is not only about writing code, but also about choosing meaningful URLs and methods.

#### 3. Routes and Controllers

The project uses separate route files for users, videos, comments, and authentication. The routes only define the endpoint paths, while the controller files contain the actual logic.

Examples:

- `src/routes/users.js`
- `src/routes/videos.js`
- `src/routes/comments.js`
- `src/routes/authRoutes.js`
- `src/controllers/userController.js`
- `src/controllers/videoController.js`
- `src/controllers/commentController.js`
- `src/controllers/authController.js`

This structure made the code more organized and easier to maintain.

#### 4. Middleware

Middleware was used for important backend tasks. For example, CORS was used to allow communication between the frontend and backend. Morgan was used for logging requests. The authentication middleware was used to protect private routes by checking the JWT token before allowing access.

The upload middleware also used Multer to handle uploaded files and check whether the uploaded file was a video or image.

#### 5. Prisma and Database Integration

The current server also uses Prisma ORM with PostgreSQL. Prisma helped define models such as `User`, `Video`, `Comment`, `Like`, and `Follow`. Instead of writing raw SQL queries manually, the controllers can use Prisma methods such as `findMany`, `findUnique`, `create`, `update`, and `delete`.

This helped me understand how backend APIs connect with a database and how relationships work between users, videos, comments, and likes.

#### 6. Authentication and Protected Routes

JWT authentication was used for protected routes. After a user logs in, the server returns a token. The frontend or API client must send this token in the Authorization header when accessing protected routes.

Example:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

This made me understand why authentication is important in real applications. For example, only the owner of a video should be allowed to update or delete that video.

#### 7. Error Handling and Status Codes

The backend returns different status codes based on the result of the request.

Examples:

- `200 OK` for successful fetch requests
- `201 Created` when a resource is created
- `400 Bad Request` for invalid input
- `401 Unauthorized` when a token is missing or invalid
- `403 Forbidden` when the user does not have permission
- `404 Not Found` when data is not found
- `500 Server Error` for backend or database errors

Using status codes made the API easier to test and debug.

## Reflection

### What I Learned

From this practical, I learned how a backend server is structured in a real project. Before this, I mainly understood simple routes, but this practical showed me how routes, controllers, middleware, and database files work together.

I also learned that an API should be designed clearly before writing the code. For example, endpoints like `/api/users`, `/api/videos`, and `/api/comments` are easy to understand because they describe the resources directly. I understood that good API design helps both backend and frontend developers work together more easily.

Another important thing I learned was the role of controllers. Instead of writing all logic inside the route file, the controller keeps the route file cleaner. This makes the project more readable, especially when the application becomes larger.

I also learned how protected routes work. The JWT token is checked by middleware before the request reaches the controller. This helped me understand why middleware is useful because it avoids repeating the same authentication code inside every controller function.

### Challenges Faced

#### 1. Understanding the API Structure

At first, it was a little confusing to understand why the project needed separate folders for routes, controllers, middleware, and libraries. I overcame this by looking at each folder's job separately:

- Routes decide which controller function should run.
- Controllers handle the actual request logic.
- Middleware processes the request before the controller.
- Library files handle reusable services such as Prisma.

After understanding this, the project structure became easier to follow.

#### 2. Matching Endpoints with Controller Functions

Another challenge was making sure that each route pointed to the correct controller function. If the function name was wrong or not exported correctly, the server would fail or the endpoint would not work. I overcame this by checking the route files one by one and comparing them with the controller exports.

#### 3. Protected Routes and Tokens

Testing protected routes was also challenging because the request needs a valid Bearer token. If the token is missing or copied incorrectly, the server returns an unauthorized response. I solved this by first testing registration and login, then copying the token from the login response and adding it to the Authorization header.

#### 4. Database and Prisma Setup

Using Prisma and PostgreSQL added another layer of setup. The `.env` file must contain the correct `DATABASE_URL`, and Prisma commands must be run before the server can use the database properly. I learned that backend errors are often caused by small configuration mistakes, such as wrong database name, wrong password, or missing environment variables.

#### 5. Testing Different API Responses

When testing the API, I had to check both successful and failed responses. For example, I tested normal GET requests, protected requests with a token, and protected requests without a token. This helped me see how the API behaves in different situations.

## Screenshots to Include

The following screenshots can be added to the practical folder if required:

| Screenshot Name | Description |
|---|---|
| `server-running.png` | Terminal showing the backend server running successfully |
| `register-user.png` | API response after registering a user |
| `login-user.png` | API response after login with returned token |
| `get-users.png` | GET request showing all users |
| `get-videos.png` | GET request showing all videos |
| `create-comment.png` | Protected request for creating a comment |
| `like-video.png` | Protected request for liking or unliking a video |
| `unauthorized-error.png` | Error response when accessing a protected route without token |

## Personal Learning Outcome

This practical improved my understanding of backend development. I learned that a server-side application is not only about making routes work, but also about organizing the code properly, handling errors, protecting routes, and testing every endpoint carefully.

I also understood how RESTful APIs act as the connection between the frontend and the database. The frontend sends requests, the backend processes them, and the database stores or returns the needed data. This helped me see the full flow of a web application more clearly.

## Conclusion

Overall, this practical was useful because it gave hands-on experience in building a TikTok-style backend API. I learned how to structure an Express project, create RESTful endpoints, use controllers, apply middleware, and test the API using request tools. The practical also gave me a better understanding of how authentication and database integration are added to a backend application.
