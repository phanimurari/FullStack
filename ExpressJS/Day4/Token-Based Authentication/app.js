const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// 🔑 Secret key for signing tokens
const SECRET_KEY = "secretKey";

// 🧪 Dummy user (simulate login)
const USERS = [{ id: 1, username: "alice", password: "wonderland" }];

// ✅ Public Route — Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "2h",
  });

  res.json({ token });
});

// ✅ Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    req.user = user; // Add user info to req
    next();
  });
}

// ✅ Protected In-memory Todos
let todos = [];
let idCounter = 1;

// ✅ CREATE
app.post("/todos", authenticateToken, (req, res) => {
  const { title, completed = false } = req.body;
  const newTodo = { id: idCounter++, title, completed, userId: req.user.userId };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// ✅ READ ALL
app.get("/todos", authenticateToken, (req, res) => {
  const userTodos = todos.filter((t) => t.userId == req.user.userId);
  res.json(userTodos);
});

// ✅ UPDATE
app.put("/todos/:id", authenticateToken, (req, res) => {
  const todo = todos.find(
    (t) => t.id === parseInt(req.params.id) && t.userId == req.user.userId
  );
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// ✅ DELETE
app.delete("/todos/:id", authenticateToken, (req, res) => {
  const index = todos.findIndex(
    (t) => t.id === parseInt(req.params.id) && t.userId == req.user.userId
  );
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  todos.splice(index, 1);
  res.json({ message: "Todo deleted" });
});

// ✅ Start Server
const PORT = 8005;
app.listen(PORT, () => {
  console.log(`🚀 Token Auth API running at http://localhost:${PORT}`);
});
