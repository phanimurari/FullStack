const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// TESTING cURL:
// curl -X GET http://localhost:5000/api/users/orders -H "Authorization: Bearer <ADMIN_AUTH_TOKEN>"
// Note: Replace <ADMIN_AUTH_TOKEN> with a valid JWT token for an admin user.
// @route   GET /api/users/orders
// @desc    Get all orders (admin only)
// @access  Private (Admin)
router.get('/orders', auth(['admin']), async (req, res, next) => {
  try {
    const orders = await Order.find().populate('userId', 'username email');
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
});

// TESTING cURL:
// curl -X GET http://localhost:5000/api/users/<USER_ID>/orders -H "Authorization: Bearer <ADMIN_AUTH_TOKEN>"
// Note: Replace <USER_ID> with a valid user ID and <ADMIN_AUTH_TOKEN> with a valid JWT token for an admin user.
// @route   GET /api/users/:userId/orders

router.get('/:userId/orders', auth([]), async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('userId', 'username email');
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
