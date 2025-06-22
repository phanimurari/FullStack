// models/Todo.js

const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // title is mandatory
    },
    description: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }); // Automatically manage createdAt & updatedAt

// Export the model
module.exports = mongoose.model('Todo', todoSchema);
