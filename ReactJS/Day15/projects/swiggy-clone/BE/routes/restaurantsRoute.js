const express = require('express');
const crypto = require('crypto');
const Restaurant = require('../models/Restaurant');
const Offer = require('../models/Offer');
const FoodItem = require('../models/FoodItem');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/restaurant/offers
// @desc    Get all offers
// @access  Private
router.get('/offers', auth(), async (req, res, next) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({
      offers,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /restaurants
// @desc    Get all restaurants
// @access  Private
router.get('/', auth(), async (req, res, next) => {
  try {
    const { offset = 0, limit = 9, sort_by_rating } = req.query;
    const sortOptions = {};
    if (sort_by_rating === 'Lowest') {
      sortOptions['user_rating.rating'] = 1;
    } else if (sort_by_rating === 'Highest') {
      sortOptions['user_rating.rating'] = -1;
    }

    const restaurants = await Restaurant.find({})
      .sort(sortOptions)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    const total = await Restaurant.countDocuments({});

    res.status(200).json({
      restaurants,
      total,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /restaurants
// @desc    Create a new restaurant
// @access  Private
router.post('/', auth(['admin']), async (req, res, next) => {
  try {
    const {
      name,
      image,
      location,
      cuisine,
      rating,
      delivery_time,
      price_for_two,
      offer,
      user_rating,
    } = req.body;
    const restaurantData = {
      name,
      image,
      location,
      cuisine,
      rating,
      delivery_time,
      price_for_two,
      offer,
      user_rating,
      id: crypto.randomUUID(),
    };
    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();
    res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      data: restaurant,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /restaurants/bulk
// @desc    Create multiple new restaurants
// @access  Private
router.post('/bulk', auth(['admin']), async (req, res, next) => {
  try {
    const restaurantsWithId = req.body.map((restaurant) => ({
      ...restaurant,
      id: crypto.randomUUID(),
    }));
    const restaurants = await Restaurant.insertMany(restaurantsWithId);
    res.status(201).json({
      success: true,
      message: 'Restaurants created successfully',
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/restaurant/offers/bulk
// @desc    Create multiple new offers
// @access  Private
router.post('/offers/bulk', auth(['admin']), async (req, res, next) => {
  try {
    const offers = await Offer.insertMany(req.body.offers);
    res.status(201).json({
      success: true,
      message: 'Offers created successfully',
      data: offers,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /restaurants/:id
// @desc    Get a specific restaurant by ID
// @access  Private
router.get('/:id', auth(), async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ id: req.params.id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const foodItems = await FoodItem.find({ restaurant_id: req.params.id });

    const restaurantDetails = {
      rating: restaurant.user_rating.rating,
      id: restaurant.id,
      name: restaurant.name,
      cost_for_two: restaurant.price_for_two,
      cuisine: restaurant.cuisine,
      image_url: restaurant.image,
      reviews_count: restaurant.user_rating.reviews,
      opens_at: restaurant.opens_at,
      location: restaurant.location,
      items_count: foodItems.length,
      food_items: foodItems.map(item => ({
        name: item.name,
        cost: item.cost,
        food_type: item.food_type,
        image_url: item.image_url,
        id: item.id,
        rating: item.rating,
      })),
    };

    res.status(200).json(restaurantDetails);
  } catch (error) {
    next(error);
  }
});

// @route   POST /restaurants/:id/food-items
// @desc    Add food items to a restaurant
// @access  Private - Admin
router.post('/:id/food-items', auth(['admin']), async (req, res, next) => {
  try {
    const foodItemsWithIds = req.body.map(item => ({
      ...item,
      id: crypto.randomUUID(),
      restaurant_id: req.params.id,
    }));

    const foodItems = await FoodItem.insertMany(foodItemsWithIds);

    res.status(201).json({
      success: true,
      message: 'Food items added successfully',
      data: foodItems,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/restaurant/addtocart
// @desc    Add item to cart
// @access  Private
router.post('/addtocart', auth(), async (req, res, next) => {
  try {
    const { restaurantId, foodItemId, quantity } = req.body;
    const user = await req.user.populate('cart.restaurantId');

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    const restaurant = await Restaurant.findOne({ id: restaurantId });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const cartItem = user.cart.find(
      (item) => item.foodItemId === foodItemId
    );

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ restaurantId, foodItemId, quantity });
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: user.cart,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
