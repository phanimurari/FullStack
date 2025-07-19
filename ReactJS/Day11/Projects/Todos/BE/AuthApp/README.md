// README.md
# Todo Application with JWT Authentication

A complete Todo application with user authentication built using Node.js, Express, MongoDB, and JWT.

## Features

- User registration and login with JWT authentication
- Password hashing using bcrypt
- Protected todo routes with authentication middleware
- CRUD operations for todos
- Error logging middleware
- MongoDB Atlas integration
- Input validation and error handling

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory with:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_complex
JWT_EXPIRE=7d
```

### 3. Run the Application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Todo Routes (All Protected)
- `GET /api/todos` - Get all todos for authenticated user
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

## Authentication

Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Request Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Todo
```bash
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo app with authentication"
}
```

## Project Structure
```
todo-app/
├── models/
│   ├── User.js
│   └── Todo.js
├── routes/
│   ├── auth.js
│   └── todos.js
├── middleware/
│   ├── auth.js
│   └── errorLogger.js
├── .env
├── server.js
├── package.json
└── README.md
```

## Error Handling

The application includes comprehensive error handling:
- Validation errors
- Duplicate key errors
- JWT token errors
- MongoDB connection errors
- Custom error logging middleware

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token authentication
- Input validation and sanitization
- Protected routes with authentication middleware
- User-specific todo access control