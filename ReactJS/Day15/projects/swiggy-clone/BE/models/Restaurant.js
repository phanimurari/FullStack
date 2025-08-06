const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  location: { type: String },
  cuisine: { type: String },
  rating: { type: Number },
  delivery_time: { type: String },
  price_for_two: { type: Number },
  offer: { type: String },
  user_rating: {
    rating: { type: Number },
    reviews: { type: Number },
  },
  id: { type: String, unique: true },
  has_online_delivery: { type: Boolean },
  has_table_booking: { type: Number },
  is_delivering_now: { type: Number },
  menu_type: { type: String },
  opens_at: { type: String },
  group_by_time: { type: Boolean },
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
