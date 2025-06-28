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
  
  // Session management
  lastLoginAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Update last login time
userSchema.methods.updateLastLogin = function() {
  this.lastLoginAt = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);