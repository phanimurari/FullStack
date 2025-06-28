const mongoose = require('mongoose');

// Define the Todo schema
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true }); // Automatically manage createdAt & updatedAt

// Export the model
module.exports = mongoose.model('Todo', todoSchema);