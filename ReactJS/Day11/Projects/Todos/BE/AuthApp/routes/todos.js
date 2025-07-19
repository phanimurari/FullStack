const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();


//   Get single todo
// @access  Private
router.get('/:id', auth, async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/todos
// @desc    Create new todo
// @access  Private
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const todo = new Todo({
      title,
      description,
      user: req.user._id
    });

    await todo.save();

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/todos/:id
// @desc    Update todo
// @access  Private
router.put('/:id', auth, async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    let todo = await Todo.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Update fields
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo updated successfully',
      data: todo
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete todo
// @access  Private
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/todos/:id/toggle
// @desc    Toggle todo completion status
// @access  Private
router.patch('/:id/toggle', auth, async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ 
      _id: req.params.id, 
      user: req.user._id 
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({
      success: true,
      message: 'Todo status updated successfully',
      data: todo
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/todos
// @desc    Get all todos
// @access  Private
router.get('/', auth, async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;