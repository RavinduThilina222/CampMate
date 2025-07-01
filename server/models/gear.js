const mongoose = require("mongoose");

const gearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Gear name is required"],
    trim: true,
    maxlength: [100, "Gear name cannot exceed 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [500, "Description cannot exceed 500 characters"]
  },
  rentalLocations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "RentalLocation"
  }],
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: ["tents", "sleeping", "cooking", "hiking", "clothing", "safety", "electronics", "tools", "other"],
      message: "Category must be one of: tents, sleeping, cooking, hiking, clothing, safety, electronics, tools, other"
    }
  },
  pricePerDay: {
    type: Number,
    required: [true, "Price per day is required"],
    min: [0, "Price cannot be negative"]
  },
  stock: {
    type: Number,
    required: [true, "Stock quantity is required"],
    min: [0, "Stock cannot be negative"],
    default: 0
  },
  images: [{
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: "Please provide a valid image URL"
    }
  }],
  condition: {
    type: String,
    required: [true, "Condition is required"],
    enum: {
      values: ["new", "excellent", "good", "fair", "poor"],
      message: "Condition must be one of: new, excellent, good, fair, poor"
    },
    default: "good"
  },
  ratings: {
    type: Number,
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating cannot be more than 5"],
    default: 0
  },
  totalReviews: {
    type: Number,
    min: [0, "Total reviews cannot be negative"],
    default: 0
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, "Brand name cannot exceed 50 characters"]
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

module.exports = mongoose.model("Gear", gearSchema);