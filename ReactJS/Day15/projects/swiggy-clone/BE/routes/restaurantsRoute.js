const express = require('express');
const crypto = require('crypto');
const Restaurant = require('../models/Restaurant');
const Offer = require('../models/Offer');
const FoodItem = require('../models/FoodItem');
const Order = require('../models/Order');
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

// @route   GET /api/restaurant/cart
// @desc    Get all items in cart
// @access  Private
router.get('/cart', auth(), async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.cart || user.cart.length === 0) {
      return res.status(200).json({
        cart: [],
        subTotal: 0,
        deliveryFee: 0,
        total: 0,
      });
    }

    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        const foodItem = await FoodItem.findOne({ id: item.foodItemId });
        const restaurant = await Restaurant.findOne({ id: item.restaurantId });
        return {
          ...item.toObject(),
          price: foodItem ? foodItem.cost : 0,
          image_url: foodItem ? foodItem.image_url : '',
          restaurant_name: restaurant ? restaurant.name : '',
        };
      })
    );

    const subTotal = populatedCart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const deliveryFee = 40;
    const total = subTotal + deliveryFee;

    res.status(200).json({
      cart: populatedCart.map(item => ({
        foodItemId: item.foodItemId,
        restaurantId: item.restaurantId,
        quantity: item.quantity,
        price: item.price,
        _id: item._id,
        id: item._id,
        image_url: item.image_url,
        restaurant_name: item.restaurant_name,
      })),
      subTotal,
      deliveryFee,
      total,
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
// @desc    Add item to cart and delete items from cart
// @access  Private
router.post('/addtocart', auth(), async (req, res, next) => {
  try {
    const { restaurantId, foodItemId, quantity } = req.body;
    const user = req.user;

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    const restaurant = await Restaurant.findOne({ id: restaurantId });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const cartItemIndex = user.cart.findIndex(
      (item) => item.foodItemId === foodItemId
    );

    if (cartItemIndex > -1) {
      if (quantity === 0) {
        user.cart.splice(cartItemIndex, 1);
      } else {
        user.cart[cartItemIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      user.cart.push({ restaurantId, foodItemId, quantity });
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: [
        {
          name: foodItem.name,
          cost: foodItem.cost,
          food_type: foodItem.food_type,
          image_url: foodItem.image_url,
          id: foodItem.id,
          rating: foodItem.rating,
        },
      ],
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/restaurant/placeorder
// @desc    Place a new order
// @access  Private
router.post('/placeorder', auth(), async (req, res, next) => {
  try {
    const user = req.user;
    if (user.cart.length === 0) {
      return res.status(400).json({ message: 'Cart is already empty' });
    }

    const populatedCart = await Promise.all(
      user.cart.map(async (item) => {
        const foodItem = await FoodItem.findOne({ id: item.foodItemId });
        if (!foodItem) {
          throw new Error('Food item not found in cart');
        }
        return {
          ...item.toObject(),
          foodItem,
        };
      })
    );

    let totalAmount = 0;
    const orderItems = populatedCart.map((cartItem) => {
      totalAmount += cartItem.foodItem.cost * cartItem.quantity;
      return {
        foodItemId: cartItem.foodItemId,
        name: cartItem.foodItem.name,
        quantity: cartItem.quantity,
        price: cartItem.foodItem.cost,
      };
    });
    
    const restaurantIds = [...new Set(user.cart.map(item => item.restaurantId))];

    const order = new Order({
      userId: user._id,
      restaurantId: restaurantIds.join(','), // Join IDs if multiple restaurants
      items: orderItems,
      totalAmount,
    });

    await order.save();

    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
