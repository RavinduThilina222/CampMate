const Gear = require("./../models/gear");
const Campground = require("./../models/campground");
const RentalLocation = require("./../models/rental"); // Fixed import to match your rental.js export

const getAllGear = async (req, res) => {
  try {
    const gear = await Gear.find().populate("rentalLocations");
    res.json(gear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGearById = async (req, res) => {
  try {
    const gear = await Gear.findById(req.params.id).populate("rentalLocations");
    if (!gear) return res.status(404).json({ message: "Gear not found" });
    res.json(gear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addGear = async (req, res) => {
  try {
    const gear = new Gear(req.body);
    const saved = await gear.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGear = async (req, res) => {
  try {
    const gear = await Gear.findByIdAndDelete(req.params.id);
    if (!gear) return res.status(404).json({ message: "Gear not found" });
    res.json({ message: "Gear deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGear = async (req, res) => {
  try {
    const gear = await Gear.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!gear) return res.status(404).json({ message: "Gear not found" });
    res.json(gear);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get rental locations near to campground, parameter is campground id
const rentalByLocation = async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id).populate("rentalLocations");
    if (!campground) return res.status(404).json({ message: "Campground not found" });
    
    const rentalLocations = campground.rentalLocations.map(location => ({
      id: location._id,
      name: location.name,
      address: location.address,
      coordinates: location.coordinates,
    }));
    
    res.json(rentalLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addRentalLocation = async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id);
    if (!campground) return res.status(404).json({ message: "Campground not found" });
    
    const rentalLocation = new RentalLocation({
      name: req.body.name,
      address: req.body.address,
      coordinates: req.body.coordinates,
      nearbyCampgrounds: [req.params.id]
    });
    
    const savedLocation = await rentalLocation.save();
    campground.rentalLocations.push(savedLocation._id);
    await campground.save();
    
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRentalLocation = async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id);
    if (!campground) return res.status(404).json({ message: "Campground not found" });
    
    // Remove from campground's rentalLocations array
    campground.rentalLocations.pull(req.params.locationId);
    await campground.save();
    
    // Delete the actual RentalLocation document
    await RentalLocation.findByIdAndDelete(req.params.locationId);
    
    res.json({ message: "Rental location deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRentalLocation = async (req, res) => {
  try {
    const updatedLocation = await RentalLocation.findByIdAndUpdate(
      req.params.locationId,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedLocation) return res.status(404).json({ message: "Rental location not found" });
    
    res.json(updatedLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { 
  getAllGear, 
  getGearById, 
  addGear, 
  deleteGear, 
  updateGear, 
  rentalByLocation, 
  addRentalLocation, 
  deleteRentalLocation, 
  updateRentalLocation 
};