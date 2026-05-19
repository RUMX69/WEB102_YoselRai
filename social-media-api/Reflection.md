# Reflection: Social Media API

## Practical Title
Designing and Implementing RESTful API Endpoints

## Documentation

In this practical, I created a RESTful API for a simple social media platform using Node.js and Express. The application was designed around common social media resources such as users, posts, comments, likes, and followers. Each resource was separated into its own route and controller file, which made the code easier to read, manage, and extend.

The main idea of this practical was to understand how backend APIs are structured. Instead of writing all logic inside one file, I learned to separate the project into folders such as `controllers`, `routes`, `middleware`, `utils`, and `public`. This helped me understand why project organization is important in server-side development.

## Main Concepts Applied

### 1. RESTful API Design

I applied RESTful API principles by creating resource-based endpoints such as `/users`, `/posts`, `/comments`, `/likes`, and `/followers`. Each endpoint uses HTTP methods based on the action being performed.

For example:

- `GET /users` retrieves all users.
- `GET /users/:id` retrieves a specific user.
- `POST /users` creates a new user.
- `PUT /users/:id` updates an existing user.
- `DELETE /users/:id` deletes a user.

This helped me understand that REST APIs should use clear nouns for resources and HTTP methods for actions.

### 2. Routes and Controllers

Routes were used to define endpoint paths and connect them to controller functions. Controllers contained the actual logic for handling the request and sending the response.

This separation made the project cleaner because the route files only handled URL structure, while the controller files handled the API logic.

### 3. Middleware

I used middleware for different tasks such as:

- Reading JSON request bodies.
- Logging requests with Morgan.
- Enabling CORS.
- Adding security headers with Helmet.
- Formatting responses based on the request type.
- Handling errors in one place.

Middleware helped me understand that some logic should run between the request and response cycle before the final controller sends data back to the client.

### 4. Mock Data

Since this practical did not use a database yet, mock data was stored in `utils/mockData.js`. This allowed the API to behave like a real backend while keeping the focus on endpoint design and request handling.

Using mock data made it easier to test operations such as listing users, creating posts, updating comments, and deleting records.

### 5. HTTP Status Codes

I learned how important status codes are in API development. They help the client understand whether a request was successful or failed.

Some examples used in this practical are:

- `200 OK` for successful requests.
- `201 Created` when a new resource is created.
- `400 Bad Request` for invalid input.
- `401 Unauthorized` when simulated authentication fails.
- `404 Not Found` when data does not exist.
- `500 Internal Server Error` for unexpected server errors.

### 6. Content Negotiation

The practical also introduced content negotiation. I implemented a response formatter middleware that checks the `Accept` header. If the client requests JSON, the API returns JSON. If the client requests XML, the response can be converted into XML.

This helped me understand that APIs can support different response formats depending on what the client requests.

### 7. API Documentation

A simple API documentation page was created using `public/docs.html` and served through `/api-docs`. This showed me why API documentation is useful. It helps developers understand what endpoints are available, what methods to use, and what kind of responses to expect.

## What I Learned

From this practical, I learned how to build a basic but well-structured Express API from scratch. Before doing this practical, I mostly understood APIs as links that return data. After completing it, I understood that a proper API needs route design, controller logic, request validation, status codes, error handling, and documentation.

I also learned that writing clean folder structure is important. If everything is written inside `server.js`, the project becomes difficult to manage. Separating routes, controllers, middleware, and utilities makes the code easier to read and debug.

Another important thing I learned is that HTTP methods should be used correctly. I now understand that `GET` should be used for reading data, `POST` for creating data, `PUT` for updating data, and `DELETE` for removing data.

## Challenges Faced

### Challenge 1: Understanding route and controller separation

At first, it was confusing to understand why routes and controllers were placed in different files. I understood it better after seeing that routes define the endpoint path, while controllers define what happens when that endpoint is called.

**How I solved it:**  
I followed the folder structure step by step and checked how each route imported functions from its matching controller file.

### Challenge 2: Handling errors correctly

Another challenge was understanding how custom error handling works. Instead of sending error responses directly in every controller, the project uses `ErrorResponse`, `asyncHandler`, and `errorHandler` middleware.

**How I solved it:**  
I tested invalid IDs and missing user IDs to see how the API returned error responses. This helped me understand the flow of errors from controller to middleware.

### Challenge 3: Understanding content negotiation

Content negotiation was new to me. I was used to APIs returning only JSON, so it was confusing to understand why the `Accept` header mattered.

**How I solved it:**  
I tested requests with different headers and learned that clients can ask for different formats such as JSON or XML.

### Challenge 4: Simulated authentication for posts

Some post operations used an `X-User-Id` header to simulate authentication. At first, requests failed because the required header was missing.

**How I solved it:**  
I added the `X-User-Id` header while testing `POST`, `PUT`, and `DELETE` requests for posts.

## Screenshots to Include

The following screenshots can be added to the practical submission:

1. Terminal showing the server running with `npm run dev`.
2. Browser or Thunder Client showing `GET /users` working.
3. Browser or Thunder Client showing `GET /posts` working.
4. A successful `POST /users` request.
5. A successful `POST /posts` request using the `X-User-Id` header.
6. An error response for an invalid user or post ID.
7. The `/api-docs` page showing the API documentation.

## Personal Reflection

This practical improved my understanding of backend development. I learned that creating an API is not only about returning data, but also about designing routes properly, using the correct HTTP method, returning meaningful status codes, and handling errors clearly.

I also realized that documentation is part of development. A working API is useful, but developers also need to know how to use it. Creating the documentation page helped me understand the importance of explaining endpoints properly.

Overall, this practical gave me a better foundation for later topics such as database integration, authentication, file uploads, and cloud storage. It also made me more comfortable with Express project structure and REST API development.

## Conclusion

In conclusion, this practical successfully implemented a RESTful social media API using Node.js and Express. The API supports multiple resources, uses proper routes and controllers, includes middleware for request processing and error handling, supports pagination, and provides a simple documentation page. The practical helped me understand how real server-side applications are structured before moving on to more advanced backend concepts.
