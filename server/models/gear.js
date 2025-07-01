const mongoose = require("mongoose");

const gearSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  pricePerDay: Number,
  stock: Number,
  images: [String],
  condition: String,
  ratings: Number,
  totalReviews: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gear", gearSchema);
