# Social Media API

## Practical Title
Designing and Implementing RESTful API Endpoints

## Overview
This project is a simple **Node.js and Express RESTful API** for a social media platform similar to Instagram. The API uses mock data instead of a database and focuses on designing clean REST endpoints, handling HTTP requests, returning proper status codes, adding middleware, and documenting available API routes.

The main resources used in this API are:

- Users
- Posts
- Comments
- Likes
- Followers

## Objectives
The main objectives of this practical were to:

1. Design RESTful API endpoints using proper URI structure.
2. Implement API endpoints using suitable HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`.
3. Use proper HTTP status codes for success and error responses.
4. Apply middleware for logging, security, CORS, error handling, and response formatting.
5. Implement content negotiation so the API can return JSON or XML depending on the request header.
6. Create a simple API documentation page for developers.

## Technologies Used

| Technology / Package | Purpose |
|---|---|
| Node.js | JavaScript runtime for running the server |
| Express.js | Framework used to build API routes and middleware |
| Morgan | Logs HTTP requests in the terminal |
| CORS | Allows requests from different origins |
| Helmet | Adds basic security-related HTTP headers |
| Dotenv | Loads environment variables from the `.env` file |
| Nodemon | Automatically restarts the server during development |

## Project Structure

```text
social-media-api/
├── controllers/
│   ├── commentController.js
│   ├── followerController.js
│   ├── likeController.js
│   ├── postController.js
│   └── userController.js
├── middleware/
│   ├── async.js
│   ├── errorHandler.js
│   └── formatResponse.js
├── public/
│   └── docs.html
├── routes/
│   ├── comments.js
│   ├── followers.js
│   ├── likes.js
│   ├── posts.js
│   └── users.js
├── utils/
│   ├── errorResponse.js
│   └── mockData.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

## Installation and Setup

### 1. Open the project folder

```bash
cd social-media-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create or check the `.env` file

```env
PORT=3000
```

### 4. Start the server in development mode

```bash
npm run dev
```

The server should run at:

```text
http://localhost:3000
```

The root route returns:

```json
{
  "message": "Welcome to Social Media API"
}
```

## Main Server Setup

The `server.js` file is the entry point of the project. It performs the following tasks:

- Loads environment variables using `dotenv`.
- Initializes the Express application.
- Uses `express.json()` to read JSON request bodies.
- Uses `morgan` to log requests.
- Uses `helmet` for basic security headers.
- Uses `cors` to allow cross-origin access.
- Serves the static API documentation page from the `public` folder.
- Mounts all route files for users, posts, comments, likes, and followers.
- Uses custom error-handling middleware.
- Starts the server on the configured port.

## API Documentation Page

A simple HTML documentation page is available at:

```text
http://localhost:3000/api-docs
```

This page explains the API endpoints and gives examples of expected request and response formats.

## API Endpoints

> Note: The practical worksheet discusses REST resources such as `/users` and `/posts`. In this project, the routes are mounted directly as `/users`, `/posts`, `/comments`, `/likes`, and `/followers`.

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | Get all users with pagination support |
| GET | `/users/:id` | Get a single user by ID |
| POST | `/users` | Create a new user |
| PUT | `/users/:id` | Update an existing user |
| DELETE | `/users/:id` | Delete a user |

Example request:

```bash
curl http://localhost:3000/users
```

Example request with pagination:

```bash
curl "http://localhost:3000/users?page=1&limit=10"
```

Example create request:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "new_traveler",
    "email": "new@example.com",
    "full_name": "New Traveler",
    "bio": "Adventure seeker"
  }'
```

### Posts

| Method | Endpoint | Description |
|---|---|---|
| GET | `/posts` | Get all posts with pagination support |
| GET | `/posts/:id` | Get a single post by ID |
| POST | `/posts` | Create a new post |
| PUT | `/posts/:id` | Update an existing post |
| DELETE | `/posts/:id` | Delete a post |

Some post routes simulate authentication using the `X-User-Id` header.

Example create request:

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{
    "caption": "My first API post",
    "image": "sample-image.jpg"
  }'
```

### Comments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/comments` | Get all comments |
| GET | `/comments/:id` | Get a comment by ID |
| POST | `/comments` | Create a new comment |
| PUT | `/comments/:id` | Update a comment |
| DELETE | `/comments/:id` | Delete a comment |

### Likes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/likes` | Get all likes |
| GET | `/likes/:id` | Get a like by ID |
| POST | `/likes` | Create a like |
| DELETE | `/likes/:id` | Delete a like |

### Followers

| Method | Endpoint | Description |
|---|---|---|
| GET | `/followers` | Get all follower records |
| GET | `/followers/:id` | Get a follower record by ID |
| POST | `/followers` | Follow a user |
| DELETE | `/followers/:id` | Unfollow a user |

## Content Negotiation

The project includes `middleware/formatResponse.js` to support response formatting based on the `Accept` header.

- If the client requests JSON, the API returns a normal JSON response.
- If the client requests XML using `Accept: application/xml`, the middleware converts the response into XML format.

Example XML request:

```bash
curl http://localhost:3000/users -H "Accept: application/xml"
```

## Error Handling

The project uses custom error handling to keep error responses consistent.

Important files:

- `utils/errorResponse.js` creates custom error objects with status codes.
- `middleware/async.js` catches errors from async controller functions.
- `middleware/errorHandler.js` sends error messages in a clean JSON response.

Example error response:

```json
{
  "success": false,
  "error": "User not found with id of 99"
}
```

## Testing the API

The API can be tested using a browser, Postman, Thunder Client, or curl.

### Basic tests

```bash
curl http://localhost:3000/
```

```bash
curl http://localhost:3000/users
```

```bash
curl http://localhost:3000/posts
```

```bash
curl http://localhost:3000/comments
```

```bash
curl http://localhost:3000/likes
```

```bash
curl http://localhost:3000/followers
```

### Suggested screenshots to add

When submitting the practical, add screenshots of:

1. The server running successfully in the terminal.
2. `GET /users` returning user data.
3. `GET /posts` returning post data.
4. A successful `POST /users` or `POST /posts` request.
5. A failed request showing proper error handling.
6. The `/api-docs` documentation page in the browser.

## Key Concepts Applied

### RESTful API Design

The API uses resource-based routes such as `/users`, `/posts`, and `/comments`. Each resource uses suitable HTTP methods to represent actions clearly.

### HTTP Methods

- `GET` is used to retrieve data.
- `POST` is used to create new data.
- `PUT` is used to update existing data.
- `DELETE` is used to remove data.

### HTTP Status Codes

The API returns meaningful status codes such as:

- `200 OK` for successful data retrieval or updates.
- `201 Created` for successful resource creation.
- `400 Bad Request` for invalid input.
- `401 Unauthorized` when simulated authentication fails.
- `404 Not Found` when a requested resource does not exist.
- `500 Internal Server Error` for unexpected server errors.

### Middleware

Middleware was used to process requests before they reached the route handlers. This made the application cleaner because logging, security, formatting, and error handling were separated from the main route logic.

### Mock Data

Instead of using a database, the project stores sample users, posts, comments, likes, and followers in `utils/mockData.js`. This helped focus on API structure before adding database integration in later practicals.

## Conclusion

This practical helped build a strong foundation in server-side API development using Node.js and Express. The project demonstrates how to organize routes, controllers, middleware, utilities, and documentation in a RESTful API. It also shows how API responses, status codes, pagination, content negotiation, and error handling work together to make an API more useful and developer-friendly.
