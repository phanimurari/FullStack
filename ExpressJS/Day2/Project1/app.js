// app.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

// Load env variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Use the Todo routes under /api/todos
app.use('/api/todos', todoRoutes);

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start the Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});
