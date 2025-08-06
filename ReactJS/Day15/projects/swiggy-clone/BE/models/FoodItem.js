const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  food_type: { type: String, required: true },
  image_url: { type: String, required: true },
  id: { type: String, unique: true, required: true },
  rating: { type: Number, required: true },
  restaurant_id: { type: String, required: true },
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
