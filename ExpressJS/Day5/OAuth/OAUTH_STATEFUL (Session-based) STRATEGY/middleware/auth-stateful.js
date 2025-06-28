const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  res.status(401).json({
    success: false,
    message: 'Not authenticated. Please login.'
  });
};

const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  
  res.status(400).json({
    success: false,
    message: 'Already authenticated'
  });
};

module.exports = {
  isAuthenticated,
  isNotAuthenticated
};