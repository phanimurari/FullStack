const express = require('express');
const passport = require('passport');
const User = require('../models/User-stateless');
const auth = require('../middleware/auth-stateless');

const router = express.Router();

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth
// @access  Public
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'],
  session: false  // Important: No session for stateless
}));

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = req.user.generateJWT();
      
      // Redirect to frontend with token
      res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/auth/error`);
    }
  }
);

// @route   GET /api/auth/github
// @desc    Initiate GitHub OAuth
// @access  Public
router.get('/github', passport.authenticate('github', { 
  scope: ['user:email'],
  session: false
}));

// @route   GET /api/auth/github/callback
// @desc    GitHub OAuth callback
// @access  Public
router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  (req, res) => {
    try {
      const token = req.user.generateJWT();
      res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/auth/error`);
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      provider: req.user.provider
    }
  });
});

// @route   POST /api/auth/logout
// @desc    Logout user (stateless - just inform client)
// @access  Private
router.post('/logout', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully. Please remove token from client.'
  });
});

module.exports = router;
