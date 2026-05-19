# Practical 2: TikTok Server REST API

## Overview

This folder contains the backend server for the TikTok-style application used in **WEB102 Server Application Fundamentals**. The main purpose of this practical was to design and implement a RESTful API that can communicate with a frontend application. The API handles core TikTok-style resources such as users, videos, comments, likes, followers, and following lists.

The practical focused on creating a structured Express.js backend using routes, controllers, middleware, environment variables, and proper HTTP methods. The current project has also been extended with Prisma, PostgreSQL, JWT authentication, and file upload support, so the backend is closer to a real server-side application.

## Practical Objectives

The main objectives of this practical were to:

- Set up an Express.js backend server.
- Create REST API endpoints for users, videos, comments, likes, followers, and following.
- Organize the backend using routes, controllers, middleware, and models.
- Use correct HTTP methods such as `GET`, `POST`, `PUT`, and `DELETE`.
- Return proper JSON responses and HTTP status codes.
- Test API endpoints using tools such as Postman, Thunder Client, or cURL.
- Prepare the backend so it can be connected to a Next.js frontend.

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment for the backend server |
| Express.js | Web framework used to create API routes |
| CORS | Allows frontend and backend to communicate across different ports |
| Morgan | Logs HTTP requests during development |
| Body-parser | Parses incoming JSON and URL-encoded request bodies |
| Dotenv | Loads environment variables from `.env` |
| Nodemon | Restarts the server automatically during development |
| Prisma | ORM used to connect the API with PostgreSQL |
| PostgreSQL | Database used for storing users, videos, comments, likes, and follows |
| Bcrypt | Hashes passwords before storing them |
| JSON Web Token | Provides token-based authentication for protected routes |
| Multer | Handles uploaded files such as video thumbnails or profile images |

## Folder Structure

```text
TikTok_Server/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── scripts/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── commentController.js
│   │   ├── userController.js
│   │   └── videoController.js
│   ├── lib/
│   │   ├── prisma.js
│   │   └── supabase.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── comments.js
│   │   ├── users.js
│   │   └── videos.js
│   ├── app.js
│   └── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RUMX69/WEB102_YoselRai.git
cd WEB102_YoselRai/Practical2/TikTok_Server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create the Environment File

Create a `.env` file inside the `TikTok_Server` folder.

```env
PORT=8000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/tiktok_db?schema=public"
JWT_SECRET=yourverylongandsecurerandomsecret
JWT_EXPIRE=30d

# Optional if Supabase storage is used in later practical work
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key
SUPABASE_PUBLIC_KEY=your-anon-public-key
SUPABASE_STORAGE_URL=https://your-project-id.supabase.co/storage/v1
```

> Do not push the `.env` file to GitHub because it contains private keys and database credentials.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run Database Migration

```bash
npx prisma migrate dev
```

### 6. Start the Development Server

```bash
npm run dev
```

The server should run at:

```text
http://localhost:8000
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the server using nodemon |
| `npm start` | Starts the server using Node.js |
| `npm run seed` | Runs the database seed file if configured correctly |

## Main Server Files

### `src/index.js`

This is the server entry point. It loads the `.env` configuration, imports the Express app, and starts the server on the selected port.

### `src/app.js`

This file creates the Express application. It registers middleware such as CORS, Morgan, and body-parser. It also mounts the main route files:

```js
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
```

It also includes a `404 Not Found` handler and general error handling middleware.

### `src/lib/prisma.js`

This file creates and exports a Prisma Client instance so that controllers can query the PostgreSQL database.

### `src/middleware/auth.js`

This middleware protects private routes. It checks for a JWT token in the `Authorization` header, verifies the token, finds the user, and attaches the user details to `req.user`.

### `src/middleware/upload.js`

This middleware uses Multer to handle uploaded files. It stores files in the upload folder, creates unique file names, and validates whether the uploaded file is a video or image.

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Login and receive a JWT token | Public |

### User Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/users` | Get all users | Public |
| `GET` | `/api/users/:id` | Get a specific user by ID | Public |
| `POST` | `/api/users/register` | Register a user | Public |
| `POST` | `/api/users/login` | Login a user | Public |
| `PUT` | `/api/users/:id` | Update user profile | Protected |
| `DELETE` | `/api/users/:id` | Delete a user | Protected |
| `GET` | `/api/users/:id/videos` | Get videos uploaded by a user | Public |
| `GET` | `/api/users/:id/followers` | Get user followers | Public |
| `GET` | `/api/users/:id/following` | Get users followed by a user | Public |
| `POST` | `/api/users/:id/follow` | Follow a user | Protected |
| `DELETE` | `/api/users/:id/follow` | Unfollow a user | Protected |

### Video Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/videos` | Get all videos | Public |
| `GET` | `/api/videos/following` | Get videos from followed users | Protected |
| `GET` | `/api/videos/:id` | Get a specific video by ID | Public |
| `GET` | `/api/videos/:id/comments` | Get comments for a video | Public |
| `GET` | `/api/videos/user/:userId` | Get videos by user ID | Public |
| `POST` | `/api/videos` | Create a new video | Protected |
| `PUT` | `/api/videos/:id` | Update a video caption | Protected |
| `DELETE` | `/api/videos/:id` | Delete a video | Protected |
| `POST` | `/api/videos/:id/like` | Like or unlike a video | Protected |
| `DELETE` | `/api/videos/:id/like` | Like or unlike a video | Protected |

### Comment Routes

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/comments` | Get comments | Public |
| `GET` | `/api/comments/:id` | Get a specific comment | Public |
| `POST` | `/api/comments` | Create a comment | Protected |
| `PUT` | `/api/comments/:id` | Update a comment | Protected |
| `DELETE` | `/api/comments/:id` | Delete a comment | Protected |

## Example Requests

### Register User

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","email":"user1@example.com","password":"password123"}'
```

### Login User

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user1@example.com","password":"password123"}'
```

### Get All Videos

```bash
curl -X GET http://localhost:8000/api/videos
```

### Get All Users

```bash
curl -X GET http://localhost:8000/api/users
```

### Create a Comment

```bash
curl -X POST http://localhost:8000/api/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"videoId":"VIDEO_ID_HERE","text":"Nice video!"}'
```

### Like a Video

```bash
curl -X POST http://localhost:8000/api/videos/VIDEO_ID_HERE/like \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## HTTP Status Codes Used

| Status Code | Meaning | Example Use |
|---|---|---|
| `200 OK` | Request successful | Fetching users or videos |
| `201 Created` | New resource created | Registering a user or creating a video |
| `400 Bad Request` | Invalid input | Missing required fields |
| `401 Unauthorized` | User is not authenticated | Missing or invalid token |
| `403 Forbidden` | User is authenticated but not allowed | Updating another user's video |
| `404 Not Found` | Resource does not exist | Invalid user, video, or comment ID |
| `500 Server Error` | Server-side issue | Database or backend error |

## Testing

The API can be tested using Postman, Thunder Client, or cURL.

Suggested tests:

1. Register a new user.
2. Login and copy the returned token.
3. Get all users.
4. Get all videos.
5. Create a video using the token.
6. Create a comment on a video.
7. Like and unlike a video.
8. Follow and unfollow another user.
9. Try a protected route without a token and confirm that it returns an authentication error.

## Suggested Screenshots for Submission

Place screenshots in a `screenshots/` folder if needed.

| Screenshot | What to Capture |
|---|---|
| `server-running.png` | Terminal showing `npm run dev` and the server running |
| `register-user.png` | Successful user registration response |
| `login-user.png` | Successful login response with JWT token |
| `get-users.png` | GET request returning users |
| `get-videos.png` | GET request returning videos |
| `protected-route.png` | Protected request using Bearer token |
| `error-response.png` | Example of missing token or invalid request response |

## Key Concepts Learned

- REST APIs organize backend functionality into clear resources and endpoints.
- Routes define the URL path and HTTP method.
- Controllers contain the main logic for each request.
- Middleware runs between the request and response and is useful for logging, parsing, authentication, and error handling.
- JWT authentication allows protected API endpoints without storing sessions on the server.
- Prisma makes database queries easier by allowing the server to work with models instead of writing raw SQL for every operation.
- Proper HTTP status codes help both frontend developers and API users understand the result of each request.

## Conclusion

This practical helped in building the foundation of a TikTok-style backend API using Express.js. The server was organized into routes, controllers, middleware, and database-related files. The API supports important social media features such as users, videos, comments, likes, and follow relationships. It also helped in understanding how the backend communicates with the frontend and how REST APIs are tested using request tools.
