Build the Frontend Part of the Todos Application 

- Using the React 19
- Using the React Router Version 7

Should have the below Routes 

- Unprotected Route: Login Route with path `/login`
- Unprotected Route: Register Route with path `/register`
- Protected Route: Home Route with path `/`
- Protected Route: Profile Route with path `/profile`

The Unprotected Routes - Even the user haven't logged in can able to access the below routes
The Unprotected Routes - Can be accessible only when the user logged in 

Ensure to use the React Router Version 7 with command `npm i react-router-dom`


Register Page - `/register` 

Should have email and password fields and should call the below API

POST http://localhost:8005/api/auth/register
Content-Type: application/json

{
  "username": "johndoe2",
  "email": "john@example1.com",
  "password": "password123"
}

Responses:

Response 1: 
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2I5ZmUwN2M4NTRiM2Q2ZDc4YzllYiIsImlhdCI6MTc1MjkzMjMyMCwiZXhwIjoxNzUzNTM3MTIwfQ.3T9RaIZbU9YvUaaSuhF4JQLj1OR8o5Ep81gjrB9GQFU",
  "user": {
    "id": "687b9fe07c854b3d6d78c9eb",
    "username": "johndoe2",
    "email": "john@example1.com"
  }
}

Response 2: 
{

  "success": false,
  "message": "User with this email or username already exists"
}


Similarly Login Should also have `email` and `password` fields

Response 1:

```
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2I5ZmUwN2M4NTRiM2Q2ZDc4YzllYiIsImlhdCI6MTc1MjkzMjQxNiwiZXhwIjoxNzUzNTM3MjE2fQ.WWAJ0XHc2xLNHhYAv7qPygpcOOsF98pO3RuBWdfYPp0",
  "user": {
    "id": "687b9fe07c854b3d6d78c9eb",
    "username": "johndoe2",
    "email": "john@example1.com"
  }
}
```

```
{
  "success": false,
  "message": "Invalid credentials"
}
```


In Home Screen, add the functionality to post, get, delete, update the todos.

For Post API


POST http://localhost:8005/api/todos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2I5ZmUwN2M4NTRiM2Q2ZDc4YzllYiIsImlhdCI6MTc1MjkzMjU0MywiZXhwIjoxNzUzNTM3MzQzfQ.c8lWbHtT4QBD4HmQHQ976aNYoF-yAHXYHBQCdutXs0E
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo app with authentication"
}

Response:

```
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "title": "Complete project",
    "description": "Finish the todo app with authentication",
    "completed": false,
    "user": "687b9fe07c854b3d6d78c9eb",
    "_id": "687ba0ce7c854b3d6d78c9f3",
    "createdAt": "2025-07-19T13:42:38.286Z",
    "updatedAt": "2025-07-19T13:42:38.286Z",
    "__v": 0
  }
}
```

GET http://localhost:8005/api/todos
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2I5ZmUwN2M4NTRiM2Q2ZDc4YzllYiIsImlhdCI6MTc1MjkzMjU0MywiZXhwIjoxNzUzNTM3MzQzfQ.c8lWbHtT4QBD4HmQHQ976aNYoF-yAHXYHBQCdutXs0E
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo app with authentication"
}

Response:

{
  "success": true,
  "data": [
    {
      "_id": "687ba0ce7c854b3d6d78c9f3",
      "title": "Complete project",
      "description": "Finish the todo app with authentication",
      "completed": false,
      "user": "687b9fe07c854b3d6d78c9eb",
      "createdAt": "2025-07-19T13:42:38.286Z",
      "updatedAt": "2025-07-19T13:42:38.286Z",
      "__v": 0
    }
  ]
}

PUT  http://localhost:8005/api/todos/6487b9fe07c854b3d6d78c9eb
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2I5ZmUwN2M4NTRiM2Q2ZDc4YzllYiIsImlhdCI6MTc1MjkzMjU0MywiZXhwIjoxNzUzNTM3MzQzfQ.c8lWbHtT4QBD4HmQHQ976aNYoF-yAHXYHBQCdutXs0E
Content-Type: application/json

{
  "title": "Updated project",
  "description": "Finish the todo app with authentication - UPDATED",
  "completed": true
}


Response:


{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "_id": "687ba0ce7c854b3d6d78c9f3",
    "title": "Updated project",
    "description": "Finish the todo app with authentication - UPDATED",
    "completed": true,
    "user": "687b9fe07c854b3d6d78c9eb",
    "createdAt": "2025-07-19T13:42:38.286Z",
    "updatedAt": "2025-07-19T13:50:41.513Z",
    "__v": 0
  }
}



DELETE  http://localhost:8005/api/todos/687ba0ce7c854b3d6d78c9f3
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4N2I5ZmUwN2M4NTRiM2Q2ZDc4YzllYiIsImlhdCI6MTc1MjkzMjU0MywiZXhwIjoxNzUzNTM3MzQzfQ.c8lWbHtT4QBD4HmQHQ976aNYoF-yAHXYHBQCdutXs0E
Content-Type: application/json

{
  "success": true,
  "message": "Todo deleted successfully"
}

### Styling and UI

- Use the Tailwind CSS latest version for styling

