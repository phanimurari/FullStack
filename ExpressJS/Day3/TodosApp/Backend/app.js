// app.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors');

// const defaultLogger = require('./middleware/logger');           // ✅ Custom logger middleware
// const errorLogger = require('./middleware/errorLogger'); // ✅ Error handling middleware



// Load env variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors());

// Use the Todo routes under /api/todos
app.use('/api/todos', todoRoutes);
// app.use('/user', userRoutes);

// // Custom error-handling middleware
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({ message: "Oops! Something went wrong, this is custom error handling middleware message" });
// });

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start the Express server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server started at http://localhost:${PORT}`);
});
