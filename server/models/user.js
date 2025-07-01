const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "Please provide a valid email address"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    validate: {
      validator: function(v) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(v);
      },
      message: "Please provide a valid phone number"
    }
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
    maxlength: [200, "Address cannot exceed 200 characters"]
  },
  role: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "Role must be either user or admin"
    },
    default: "user"
  },
  dateOfBirth: {
    type: Date
  },
  lastLogin: {
    type: Date
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


module.exports = mongoose.model("User", userSchema);