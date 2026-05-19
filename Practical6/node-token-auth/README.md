# Practical 6: Node Token Authentication

## Overview

This practical implements a simple token-based authentication API using **Node.js**, **Express.js**, **JSON Web Tokens (JWT)**, **bcryptjs**, and **dotenv**. The project demonstrates how a server can register users, log users in, generate a JWT, and protect routes using middleware.

The folder for this practical is:

```txt
Practical6/node-token-auth
```

## Aim

The aim of this practical is to understand how token-based authentication works in a server-side application and how protected API endpoints can be accessed only when a valid token is provided.

## Learning Objectives

By completing this practical, the following concepts were applied:

- Understand the difference between session-based and token-based authentication.
- Use JWT to generate and verify authentication tokens.
- Hash passwords using `bcryptjs` before storing them.
- Store configuration values such as `JWT_SECRET` and `PORT` using `.env`.
- Create public routes for registration and login.
- Create protected routes using authentication middleware.
- Test API endpoints using Thunder Client or Postman.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment for running JavaScript on the server |
| Express.js | Framework for creating API routes and middleware |
| JSON Web Token | Generates and verifies authentication tokens |
| bcryptjs | Hashes passwords before storing them |
| dotenv | Loads environment variables from `.env` |
| Thunder Client/Postman | Used for API testing |

## Project Structure

```txt
node-token-auth/
├── middleware/
│   └── verifyToken.js
├── routes/
│   ├── auth.js
│   └── protected.js
├── .env
├── package-lock.json
├── package.json
└── server.js
```

## Installation and Setup

### 1. Open the project folder

```bash
cd Practical6/node-token-auth
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create or check the `.env` file

```env
JWT_SECRET=replace_with_your_secret_key
PORT=3000
```

> Note: In real projects, `.env` should not be committed to GitHub because it contains sensitive information.

### 4. Start the server

```bash
node server.js
```

If the server starts correctly, it should run on:

```txt
http://localhost:3000
```

## Implementation Details

### 1. Main Server File

The `server.js` file is the entry point of the application. It loads environment variables, creates the Express app, enables JSON parsing, connects route files, and starts the server.

Main responsibilities:

- Load `.env` values using `dotenv`.
- Use `express.json()` to read JSON request bodies.
- Mount authentication routes under `/auth`.
- Mount protected routes at `/`.
- Start the server using the configured port.

### 2. Authentication Routes

The `routes/auth.js` file handles user registration, login, and user listing.

#### Register User

```http
POST /auth/register
```

Example request body:

```json
{
  "name": "John Doe",
  "email": "student@test.com",
  "password": "123456"
}
```

Expected response:

```json
{
  "message": "User registered successfully!"
}
```

Main logic:

- Checks that `name`, `email`, and `password` are provided.
- Checks if the email already exists.
- Hashes the password using `bcryptjs`.
- Stores the user in the in-memory `users` array.
- Returns status code `201 Created`.

#### Login User

```http
POST /auth/login
```

Example request body:

```json
{
  "email": "student@test.com",
  "password": "123456"
}
```

Expected response:

```json
{
  "message": "Login successful!",
  "token": "generated_jwt_token_here"
}
```

Main logic:

- Finds the user by email.
- Compares the entered password with the hashed password.
- Generates a JWT token if the login is successful.
- Returns the token to the client.

#### Get All Users

```http
GET /auth/users
```

Expected response:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "student@test.com"
  }
]
```

Main logic:

- Returns all registered users.
- Excludes the password field from the response.
- This route does not require a token.

### 3. Token Verification Middleware

The `middleware/verifyToken.js` file checks whether a request contains a valid JWT token.

The token is expected in the request header:

```txt
Authorization: Bearer <token>
```

Main logic:

- Reads the token from the `Authorization` header.
- Returns `401 Unauthorized` if no token is provided.
- Verifies the token using `jwt.verify()`.
- Attaches the decoded user data to `req.user`.
- Returns `403 Forbidden` if the token is invalid or expired.

### 4. Protected Route

The `routes/protected.js` file contains the protected profile route.

```http
GET /profile
```

This route requires a valid JWT token.

Expected response:

```json
{
  "message": "Welcome! You accessed a protected route.",
  "user": {
    "id": 1,
    "email": "student@test.com",
    "iat": 1234567890,
    "exp": 1234567890
  }
}
```

## API Endpoints Summary

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user with name, email, and password |
| POST | `/auth/login` | Public | Login and receive a JWT token |
| GET | `/auth/users` | Public | Display all registered users without passwords |
| GET | `/profile` | Protected | Display user data only if a valid token is provided |

## Testing

The API was tested using Thunder Client/Postman.

### Test 1: Register User

```http
POST http://localhost:3000/auth/register
```

Expected status:

```txt
201 Created
```

### Test 2: Login User

```http
POST http://localhost:3000/auth/login
```

Expected status:

```txt
200 OK
```

The response should return a JWT token.

### Test 3: Access Protected Route With Token

```http
GET http://localhost:3000/profile
```

Header:

```txt
Authorization: Bearer <token>
```

Expected status:

```txt
200 OK
```

### Test 4: Access Protected Route Without Token

```http
GET http://localhost:3000/profile
```

Expected status:

```txt
401 Unauthorized
```

### Test 5: Access Protected Route With Fake Token

```http
GET http://localhost:3000/profile
```

Header:

```txt
Authorization: Bearer fake_token
```

Expected status:

```txt
403 Forbidden
```

### Test 6: Get All Users

```http
GET http://localhost:3000/auth/users
```

Expected status:

```txt
200 OK
```

The response should show only `id`, `name`, and `email`.

## Screenshot Checklist

Screenshots to include in the report:

1. Server running successfully in the terminal.
2. Successful user registration response.
3. Successful login response with JWT token.
4. Successful `/profile` request with Bearer token.
5. Failed `/profile` request without token.
6. Failed `/profile` request with invalid token.
7. Successful `/auth/users` response showing users without passwords.

## Key Concepts Learned

### Token-Based Authentication

Token-based authentication is stateless. After login, the server gives the client a token. The client sends this token with future requests, and the server verifies it instead of storing a session.

### Password Hashing

Passwords should not be stored as plain text. In this practical, `bcryptjs` was used to convert the password into a secure hash before saving it.

### JWT Payload

A JWT payload can be decoded by anyone, so sensitive information such as passwords should never be stored inside the token.

### Middleware

Middleware helps keep the code clean by separating token verification logic from the route handler. This makes protected routes easier to manage and reuse.

## Conclusion

This practical successfully implemented a basic token-based authentication system using Node.js and Express. It showed how users can register, log in, receive a JWT token, and access protected routes. It also demonstrated important API security practices such as password hashing, environment variables, status codes, and middleware-based route protection.
