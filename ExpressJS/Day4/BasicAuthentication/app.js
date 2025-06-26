const express = require("express");
const basicAuth = require("express-basic-auth");
const app = express();

app.use(express.json());

// ✅ Basic Auth Setup
app.use(
  basicAuth({
    users: {
      alice: "wonderland",
      bob: "builder",
    },
    challenge: true,
    unauthorizedResponse: "Unauthorized. Invalid credentials.",
  })
);

// ✅ In-memory Todos Storage
let todos = [];
let idCounter = 1;

// ✅ CREATE
app.post("/todos", (req, res) => {
  const { title, completed = false } = req.body;
  const newTodo = { id: idCounter++, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// ✅ READ ALL
app.get("/todos", (req, res) => {
  res.json(todos);
});

// ✅ READ BY ID
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});

// ✅ UPDATE
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// ✅ DELETE
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Todo not found" });

  todos.splice(index, 1);
  res.json({ message: "Todo deleted successfully" });
});

// ✅ Start Server
const PORT = 8005;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
