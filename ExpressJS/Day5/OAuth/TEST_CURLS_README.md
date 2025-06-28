# Test CURL Commands for OAuth Applications
## Prerequisites

Before testing, ensure:
1. Both servers are running (stateless on port 8005, stateful on port 8005)
2. MongoDB is connected
3. OAuth credentials are configured in .env files
4. You have valid JWT tokens (for stateless) or active sessions (for stateful)

---
## 🔐 STATELESS OAUTH APPLICATION (JWT-based) - Port 8005
### 1. OAuth Initiation (Browser Required)

```bash
# Google OAuth - Redirect to browser
curl -v "http://localhost:8005/api/auth/google"

# GitHub OAuth - Redirect to browser
curl -v "http://localhost:8005/api/auth/github"
```

**Note:** OAuth flows require browser interaction. After successful OAuth, you'll get redirected to:
`http://localhost:3000/auth/success?token=YOUR_JWT_TOKEN`

### 2. Get Current User (Protected Route)

```bash
# Replace YOUR_JWT_TOKEN with actual token from OAuth callback
curl -X GET "http://localhost:8005/api/auth/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 3. Logout (Stateless - Informational Only)

```bash
curl -X POST "http://localhost:8005/api/auth/logout" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 4. Get All Todos

```bash
curl -X GET "http://localhost:8005/api/todos" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 5. Create New Todo

```bash
curl -X POST "http://localhost:8005/api/todos" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete OAuth implementation",
    "description": "Finish the stateless OAuth todo app"
  }'
```

### 6. Update Todo

```bash
# Replace TODO_ID with actual todo ID
curl -X PUT "http://localhost:8005/api/todos/TODO_ID" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated todo title",
    "description": "Updated description",
    "completed": true
  }'
```

### 7. Delete Todo

```bash
# Replace TODO_ID with actual todo ID
curl -X DELETE "http://localhost:8005/api/todos/TODO_ID" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

### 8. Test Unauthorized Access

```bash
# Should return 401 Unauthorized
curl -X GET "http://localhost:8005/api/todos" \
  -H "Content-Type: application/json"

# Should return 401 Unauthorized (invalid token)
curl -X GET "http://localhost:8005/api/todos" \
  -H "Authorization: Bearer invalid_token" \
  -H "Content-Type: application/json"
```

---

## 🍪 STATEFUL OAUTH APPLICATION (Session-based) - Port 8005

### 1. OAuth Initiation (Browser Required)

```bash
# Google OAuth - Redirect to browser
curl -v -c cookies.txt "http://localhost:8005/api/auth/google"

# GitHub OAuth - Redirect to browser
curl -v -c cookies.txt "http://localhost:8005/api/auth/github"
```

**Note:** After OAuth success, you'll be redirected to: `http://localhost:3000/dashboard`

### 2. Check Authentication Status

```bash
curl -X GET "http://localhost:8005/api/auth/check" \
  -b cookies.txt \
  -H "Content-Type: application/json"
```

### 3. Get Current User (Protected Route)

```bash
curl -X GET "http://localhost:8005/api/auth/me" \
  -b cookies.txt \
  -H "Content-Type: application/json"
```

### 4. Logout (Destroys Session)

```bash
curl -X POST "http://localhost:8005/api/auth/logout" \
  -b cookies.txt \
  -c cookies.txt \
  -H "Content-Type: application/json"
```

### 5. Get All Todos

```bash
curl -X GET "http://localhost:8005/api/todos" \
  -b cookies.txt \
  -H "Content-Type: application/json"
```

### 6. Create New Todo

```bash
curl -X POST "http://localhost:8005/api/todos" \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete OAuth implementation",
    "description": "Finish the stateful OAuth todo app"
  }'
```

### 7. Update Todo

```bash
# Replace TODO_ID with actual todo ID
curl -X PUT "http://localhost:8005/api/todos/TODO_ID" \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated todo title",
    "description": "Updated description",
    "completed": true
  }'
```

### 8. Delete Todo

```bash
# Replace TODO_ID with actual todo ID
curl -X DELETE "http://localhost:8005/api/todos/TODO_ID" \
  -b cookies.txt \
  -H "Content-Type: application/json"
```

### 9. Test Unauthorized Access

```bash
# Should return 401 Unauthorized (no session)
curl -X GET "http://localhost:8005/api/todos" \
  -H "Content-Type: application/json"

# Should return 401 Unauthorized (no cookies)
curl -X GET "http://localhost:8005/api/auth/me" \
  -H "Content-Type: application/json"
```

---

## 🧪 Testing Scenarios

### Scenario 1: Complete Stateless Flow

```bash
# 1. Start with unauthorized request
curl -X GET "http://localhost:8005/api/todos"
# Expected: 401 Unauthorized

# 2. Initiate OAuth (requires browser)
# Visit: http://localhost:8005/api/auth/google
# Get token from callback URL

# 3. Test with valid token
export JWT_TOKEN="your_actual_jwt_token_here"

curl -X GET "http://localhost:8005/api/auth/me" \
  -H "Authorization: Bearer $JWT_TOKEN"

# 4. Create todo
curl -X POST "http://localhost:8005/api/todos" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo", "description": "Testing CURL"}'

# 5. Get todos
curl -X GET "http://localhost:8005/api/todos" \
  -H "Authorization: Bearer $JWT_TOKEN"
```

### Scenario 2: Complete Stateful Flow

```bash
# 1. Start with unauthorized request
curl -X GET "http://localhost:8005/api/todos"
# Expected: 401 Unauthorized

# 2. Check auth status
curl -X GET "http://localhost:8005/api/auth/check" -c cookies.txt
# Expected: {"authenticated": false, "user": null}

# 3. Initiate OAuth (requires browser)
# Visit: http://localhost:8005/api/auth/google
# Cookies will be set automatically

# 4. Test with session
curl -X GET "http://localhost:8005/api/auth/me" -b cookies.txt

# 5. Create todo
curl -X POST "http://localhost:8005/api/todos" \
  -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo", "description": "Testing CURL"}'

# 6. Get todos
curl -X GET "http://localhost:8005/api/todos" -b cookies.txt

# 7. Logout
curl -X POST "http://localhost:8005/api/auth/logout" -b cookies.txt -c cookies.txt
```

---

## 🔧 Helper Commands

### Generate Test JWT Token (for development)

```bash
# You can create a simple script to generate test tokens
node -e "
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { id: 'USER_ID_HERE', email: 'test@example.com', provider: 'google' },
  'your_super_secret_jwt_key_for_oauth_stateless',
  { expiresIn: '7d' }
);
console.log('JWT Token:', token);
"
```

### Check Session Store (MongoDB)

```bash
# Connect to MongoDB and check sessions collection
mongo "mongodb+srv://username:password@cluster.mongodb.net/oauth_stateful_todo"
# db.sessions.find().pretty()
```

### Verbose Debugging

```bash
# Add -v flag for verbose output
curl -v -X GET "http://localhost:8005/api/auth/me" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Add -i flag to include response headers
curl -i -X GET "http://localhost:8005/api/auth/check" -b cookies.txt
```

---

## 📝 Expected Response Formats

### Successful Authentication Response
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "avatar": "avatar_url",
    "provider": "google"
  }
}
```

### Successful Todo Creation
```json
{
  "success": true,
  "message": "Todo created",
  "data": {
    "_id": "todo_id",
    "title": "Todo Title",
    "description": "Todo Description",
    "completed": false,
    "user": "user_id",
    "createdAt": "2025-06-28T...",
    "updatedAt": "2025-06-28T..."
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```