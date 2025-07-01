const Campground = require("../models/campground");

const getAllCampgrounds = async (req, res) => {
  try {
    const campgrounds = await Campground.find();
    res.json(campgrounds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCampground = async (req, res) => {
  try {
    const campground = new Campground(req.body);
    const saved = await campground.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllCampgrounds, addCampground };
