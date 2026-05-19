# Reflection: Practical 6 Node Token Authentication

## Documentation

This practical focused on implementing a token-based authentication system in a Node.js server application. The main technologies used were Express.js for route handling, JSON Web Token for token creation and verification, bcryptjs for password hashing, and dotenv for environment variables.

The project was created inside the folder:

```txt
Practical6/node-token-auth
```

The main files used in this practical were:

| File | Purpose |
|---|---|
| `server.js` | Main server file that connects middleware and route files |
| `routes/auth.js` | Handles registration, login, and user listing |
| `routes/protected.js` | Contains the protected `/profile` route |
| `middleware/verifyToken.js` | Verifies JWT tokens before allowing protected access |
| `.env` | Stores the JWT secret key and server port |

## Main Concepts Applied

### 1. Token-Based Authentication

I learned that token-based authentication does not require the server to store session data. After a user logs in, the server generates a JWT and sends it back to the client. The client then sends the token in the `Authorization` header when accessing protected routes.

### 2. User Registration

The registration route accepts `name`, `email`, and `password`. Before storing the user, the password is hashed using `bcryptjs`. This is important because storing plain-text passwords is unsafe.

### 3. User Login

The login route checks whether the user exists and compares the entered password with the hashed password. If the login is successful, a JWT token is generated and returned to the user.

### 4. Protected Route

The `/profile` route is protected using the `verifyToken` middleware. This route can only be accessed when the user sends a valid Bearer token in the request header.

### 5. Middleware

The `verifyToken.js` middleware checks whether the token exists and whether it is valid. If the token is missing, it returns `401 Unauthorized`. If the token is invalid or expired, it returns `403 Forbidden`.

### 6. Safe User Response

The `GET /auth/users` route returns all users but removes the password field from the response. This helped me understand that API responses should not expose sensitive information.

## What I Learned

Through this practical, I learned how authentication works in backend applications. Before doing this task, I only knew that login systems used passwords, but I did not fully understand how the server protects routes after login. Now I understand that the token is like proof that the user has already logged in.

I also learned that JWT is signed but not encrypted. This means the payload can be decoded, so passwords and sensitive data should never be placed inside a token. The token should only contain necessary information such as the user id and email.

Another important thing I learned is the difference between `401` and `403` status codes. `401` means the user is not authenticated, usually because the token is missing. `403` means the request is forbidden, usually because the token is invalid or expired.

## Challenges Faced

### Challenge 1: Understanding the Bearer Token Format

At first, the protected route was confusing because the token could not simply be pasted anywhere. It had to be sent in the correct header format:

```txt
Authorization: Bearer <token>
```

If the word `Bearer` was missing or the token was pasted incorrectly, the server treated it as missing or invalid.

### How I Solved It

I checked the token format and made sure the token was copied from the login response and pasted into the Authorization header using the Bearer token option in Thunder Client/Postman.

---

### Challenge 2: Password Should Not Be Returned

Another challenge was understanding why the `GET /auth/users` route should not return the password. Since the password was already hashed, it may seem safe, but it is still sensitive information and should not be exposed.

### How I Solved It

I used `map()` to create a new array of users that only returns:

```js
id
name
email
```

The password field was intentionally left out of the response.

---

### Challenge 3: Understanding JWT Payload

I learned that a JWT can be decoded easily, so storing sensitive information inside the token is unsafe. At first, I thought that JWT fully hides the data, but it only signs the data to prove that it was not changed.

### How I Solved It

I kept the JWT payload simple by only including the user's id and email. I avoided adding passwords or other sensitive data.

## Testing Reflection

The API was tested using Thunder Client/Postman. The main tests were:

| Test | Endpoint | Expected Result |
|---|---|---|
| Register user | `POST /auth/register` | User is created successfully |
| Login user | `POST /auth/login` | JWT token is returned |
| Protected route with token | `GET /profile` | Profile data is returned |
| Protected route without token | `GET /profile` | 401 Unauthorized |
| Protected route with fake token | `GET /profile` | 403 Forbidden |
| Get all users | `GET /auth/users` | Users are returned without passwords |

These tests helped confirm that the system works correctly for both successful and error cases.

## Personal Reflection

This practical was useful because authentication is an important part of almost every real web application. I understood how backend security is not only about checking email and password, but also about protecting routes after login.

I also realized that small mistakes in authentication can cause security problems. For example, exposing passwords, using weak secrets, or sending the token incorrectly can break the system or make it unsafe.

Overall, this practical improved my understanding of backend authentication, middleware, JWT, password hashing, and API testing. It also helped me understand how a login system can be built step by step in a simple Express application.

## Conclusion

In conclusion, this practical successfully implemented a basic token-based authentication system using Node.js and Express. The system supports user registration, login, protected route access, token validation, and safe user listing. The main learning outcome was understanding how JWT and middleware work together to secure API endpoints.
