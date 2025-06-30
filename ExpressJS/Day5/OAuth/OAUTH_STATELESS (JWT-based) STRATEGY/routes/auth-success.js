const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User-stateless');

const router = express.Router();

// @route   GET /auth/success
// @desc    Display authentication success page
// @access  Public (but requires valid token in query)

router.get('/', async (req, res) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Authentication Error</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 600px; 
              margin: 50px auto; 
              padding: 20px;
              background-color: #f5f5f5;
            }
            .error-container {
              background-color: #fff;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .error { color: #d32f2f; }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1 class="error">Authentication Error</h1>
            <p>No token provided. Please try logging in again.</p>
            <a href="/api/auth/google">Login with Google</a> | 
            <a href="/api/auth/github">Login with GitHub</a>
          </div>
        </body>
        </html>
      `);
    }

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user details from database
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>User Not Found</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 600px; 
              margin: 50px auto; 
              padding: 20px;
              background-color: #f5f5f5;
            }
            .error-container {
              background-color: #fff;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .error { color: #d32f2f; }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1 class="error">User Not Found</h1>
            <p>The user associated with this token could not be found.</p>
            <a href="/api/auth/google">Login with Google</a> | 
            <a href="/api/auth/github">Login with GitHub</a>
          </div>
        </body>
        </html>
      `);
    }

    // Display success page with user information
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Authentication Success</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 600px; 
            margin: 50px auto; 
            padding: 20px;
            background-color: #f5f5f5;
          }
          .success-container {
            background-color: #fff;
            border: 1px solid #4caf50;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .success { color: #4caf50; }
          .user-info {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .token-container {
            background-color: #e8f5e8;
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
            word-break: break-all;
            font-family: monospace;
            font-size: 12px;
          }
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 15px;
            vertical-align: middle;
          }
          .user-details {
            display: inline-block;
            vertical-align: middle;
          }
          .copy-btn {
            background-color: #4caf50;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            margin-left: 10px;
          }
          .copy-btn:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="success-container">
          <h1 class="success">🎉 Authentication Successful!</h1>
          
          <div class="user-info">
            <div style="margin-bottom: 15px;">
              ${user.avatar ? `<img src="${user.avatar}" alt="User Avatar" class="avatar">` : ''}
              <div class="user-details">
                <h2 style="margin: 0; color: #333;">Hey ${user.name || 'User'} logged in successfully!</h2>
                <p style="margin: 5px 0; color: #666;">Welcome back!</p>
              </div>
            </div>
            
            <div style="margin-top: 20px;">
              <p><strong>User Email:</strong> ${user.email}</p>
              <p><strong>Provider:</strong> ${user.provider}</p>
            </div>
          </div>

          <div>
            <label for="token"><strong>User Token:</strong></label>
            <div class="token-container" id="tokenContainer">
              ${token}
              <button class="copy-btn" onclick="copyToken()">Copy</button>
            </div>
          </div>

          <div style="margin-top: 30px; text-align: center;">
            <a href="#" onclick="logout()" style="color: #f44336; text-decoration: none; margin: 0 10px;">Logout</a>
          </div>
        </div>

        <script>
          function copyToken() {
            const tokenText = document.getElementById('tokenContainer').textContent.trim();
            const tokenOnly = tokenText.replace('Copy', '').trim();
            
            navigator.clipboard.writeText(tokenOnly).then(function() {
              alert('Token copied to clipboard!');
            }, function(err) {
              console.error('Could not copy text: ', err);
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = tokenOnly;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
              alert('Token copied to clipboard!');
            });
          }

          function logout() {
            if (confirm('Are you sure you want to logout?')) {
              // In a real app, you would make a request to logout endpoint
              // and then redirect to login page
              alert('In a real application, this would clear the token and redirect to login.');
              window.location.href = '/';
            }
          }

          // Store token in localStorage for easy access (optional)
          localStorage.setItem('authToken', '${token}');
          console.log('Token stored in localStorage as "authToken"');
        </script>
      </body>
      </html>
    `);

  } catch (error) {
    console.error('Error in auth success route:', error);
    
    // Handle invalid token
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invalid Token</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 600px; 
              margin: 50px auto; 
              padding: 20px;
              background-color: #f5f5f5;
            }
            .error-container {
              background-color: #fff;
              border: 1px solid #f44336;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .error { color: #f44336; }
          </style>
        </head>
        <body>
          <div class="error-container">
            <h1 class="error">Invalid or Expired Token</h1>
            <p>Your authentication token is invalid or has expired. Please log in again.</p>
            <a href="/api/auth/google">Login with Google</a> | 
            <a href="/api/auth/github">Login with GitHub</a>
          </div>
        </body>
        </html>
      `);
    }
    
    // Handle other errors
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Error</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 600px; 
            margin: 50px auto; 
            padding: 20px;
            background-color: #f5f5f5;
          }
          .error-container {
            background-color: #fff;
            border: 1px solid #ff9800;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .error { color: #ff9800; }
        </style>
      </head>
      <body>
        <div class="error-container">
          <h1 class="error">Server Error</h1>
          <p>Something went wrong on our end. Please try again later.</p>
          <a href="/api/auth/google">Login with Google</a> | 
          <a href="/api/auth/github">Login with GitHub</a>
        </div>
      </body>
      </html>
    `);
  }
});

module.exports = router;