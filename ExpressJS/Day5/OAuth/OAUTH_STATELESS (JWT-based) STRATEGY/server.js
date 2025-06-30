const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');

// Load environment variables
dotenv.config();

// Import passport configuration
require('./config/passport-stateless');

// Import routes
const authRoutes = require('./routes/auth-stateless');
const todoRoutes = require('./routes/todos-stateless');
const authSuccessRoutes = require('./routes/auth-success')

// Import middleware
const errorLogger = require('./middleware/errorLogger');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Initialize Passport (NO session middleware for stateless)
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/auth-success', authSuccessRoutes); // the new success page route

// Error handling middleware
app.use(errorLogger);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB (Stateless OAuth)'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Stateless OAuth Server running on port ${PORT}`);
});