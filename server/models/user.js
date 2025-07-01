const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phoneNumber: { type: String, unique: true },
  address: String,
  password: String,
  role: { type: String, default: "user" }, // or 'admin'
});

module.exports = mongoose.model("User", userSchema);
