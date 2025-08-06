const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  image_url: { type: String },
  id: { type: Number, unique: true },
});

module.exports = mongoose.model('Offer', offerSchema);
