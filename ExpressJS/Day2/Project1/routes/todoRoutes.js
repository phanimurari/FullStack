// routes/todoRoutes.js

const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

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

// ✅ READ - GET /api/todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;
