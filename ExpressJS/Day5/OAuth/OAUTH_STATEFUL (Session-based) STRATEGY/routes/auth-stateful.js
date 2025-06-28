const express = require('express');
const passport = require('passport');
const User = require('../models/User-stateful');
const { isAuthenticated } = require('../middleware/auth-stateful');

const router = express.Router();

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth
// @access  Public
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email']
}));

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', 
  passport.authenticate('google', { 
    successRedirect: `${process.env.CLIENT_URL}/dashboard`,
    failureRedirect: `${process.env.CLIENT_URL}/auth/error`
  })
);

// @route   GET /api/auth/github
// @desc    Initiate GitHub OAuth
// @access  Public
router.get('/github', passport.authenticate('github', { 
  scope: ['user:email']
}));

// @route   GET /api/auth/github/callback
// @desc    GitHub OAuth callback
// @access  Public
router.get('/github/callback',
  passport.authenticate('github', {
    successRedirect: `${process.env.CLIENT_URL}/dashboard`,
    failureRedirect: `${process.env.CLIENT_URL}/auth/error`
  })
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', isAuthenticated, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      provider: req.user.provider,
      lastLoginAt: req.user.lastLoginAt
    }
  });
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', isAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Could not log out'
      });
    }
    
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Could not destroy session'
        });
      }
      
      res.clearCookie('connect.sid'); // Clear session cookie
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    });
  });
});

// @route   GET /api/auth/check
// @desc    Check if user is authenticated
// @access  Public
router.get('/check', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.isAuthenticated() ? {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    } : null
  });
});

module.exports = router;