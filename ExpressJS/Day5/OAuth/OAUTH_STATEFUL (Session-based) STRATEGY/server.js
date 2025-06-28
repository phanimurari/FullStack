const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Load environment variables
dotenv.config();

// Import passport configuration
require('./config/passport-stateful');

// Import routes
const authRoutes = require('./routes/auth-stateful');
const todoRoutes = require('./routes/todos-stateful');

// Import middleware
const errorLogger = require('./middleware/errorLogger');

const app = express();

// Trust proxy (important for production)
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true  // Important: Allow cookies
}));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60 // 24 hours in seconds
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,  // Prevent XSS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  }
}));

// Initialize Passport with sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use(errorLogger);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB (Stateful OAuth)'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Stateful OAuth Server running on port ${PORT}`);
});
