const express = require('express');
const Todo = require('../models/Todo-stateful');
const { isAuthenticated } = require('../middleware/auth-stateful');

const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);

// @route   GET /api/todos
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/todos
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description, user: req.user._id });
    await todo.save();
    res.status(201).json({ success: true, message: 'Todo created', data: todo });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/todos/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, completed },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }
    
    res.json({ success: true, message: 'Todo updated', data: todo });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/todos/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
    if (!todo) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }
    
    res.json({ success: true, message: 'Todo deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;