const mongoose = require("mongoose");

const campgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Campground name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [1000, "Description cannot exceed 1000 characters"]
  },
  location: {
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true
    },
    province: {
      type: String,
      required: [true, "State is required"],
      trim: true
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      default: "USA"
    },
    zipCode: {
      type: String,
      trim: true
    },
    coordinates: {
      latitude: {
        type: Number,
        min: [5, "Latitude must be between -90 and 90"],
        max: [10, "Latitude must be between -90 and 90"]
      },
      longitude: {
        type: Number,
        min: [79, "Longitude must be between -180 and 180"],
        max: [81, "Longitude must be between -180 and 180"]
      }
    }
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
  
  rating: {
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
  season: {
    type: String,
    required: [true, "Season is required"],
    enum: {
      values: [
        "north-east monsoon",
        "south-west monsoon",
      ]
    },
    default: "summer"
  },
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
  timestamps: true
});

module.exports = mongoose.model("Campground", campgroundSchema);