// routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

const logger = require('../middleware/logger'); // 👈 Your custom middleware
const errorLogger = require("../middleware/errorLogger")


// ✅ CREATE - POST /api/todos
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        // Create a new todo
        const newTodo = new Todo({ title, description });
        const savedTodo = await newTodo.save();

        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// // ✅ READ - GET /api/todos


// GET /api/todos?completed=true
router.get('/', async (req, res) => {
  try {
    const { completed } = req.query;

    let filter = {};
    if (completed === 'true') filter.completed = true;
    if (completed === 'false') filter.completed = false;

    const todos = await Todo.find(filter);
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

// ✅ UPDATE - PUT /api/todos/:id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        console.log(id, "id")

        // Find and update the todo
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ DELETE - DELETE /api/todos/:id
router.delete('/:id',  async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📌 GET /api/todos/search?completed=true&limit=5&title=buy
router.get('/search', async (req, res) => {
  try {
    const { completed, limit, title } = req.query;

    // Build dynamic filter object
    const filter = {};
    if (completed === "true" || completed === "false") {
      filter.completed = completed === "true";
    }
    if (title) {
      filter.title = { $regex: title, $options: 'i' }; // Case-insensitive partial match
    }

    let query = Todo.find(filter);

    if (limit && !isNaN(limit)) {
      query = query.limit(Number(limit));
    }

    const results = await query.exec();

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// router.get("/throwError", loggerMiddleWare, AuthMiddleware, (req, res) => {
//   throw new Error("Something went wrong!");
// });


router.get('/secure-data', errorLogger, (req, res) => {
  throw new Error("my error")
  res.send('Only this route logs with logger middleware');
});
// ⏩ Execution Order:
// /secure-data → logger → route handler


module.exports = router;
