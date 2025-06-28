const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // OAuth provider info
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  
  // User info from OAuth provider
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  
  // OAuth provider name
  provider: {
    type: String,
    enum: ['google', 'github'],
    required: true
  },
  
  // Additional user data
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Add method to generate JWT token
userSchema.methods.generateJWT = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      provider: this.provider
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

module.exports = mongoose.model('User', userSchema);
