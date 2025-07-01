const mongoose = require("mongoose");

const rentalLocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  nearbyCampgrounds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campground"
    }
  ],
});

module.exports = mongoose.model("RentalLocation", rentalLocationSchema);
