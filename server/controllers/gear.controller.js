const Gear = require("./../models/gear");

const getAllGear = async (req, res) => {
  const gear = await Gear.find();
  res.json(gear);
};

const getGearById = async (req, res) => {
  const gear = await Gear.findById(req.params.id);
  if (!gear) return res.status(404).json({ message: "Not found" });
  res.json(gear);
};

const addGear = async (req, res) => {
  const gear = new Gear(req.body);
  const saved = await gear.save();
  res.status(201).json(saved);
};

const deleteGear = async (req, res) => {
  await Gear.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

const updateGear = async (req, res) => {
  const gear = await Gear.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!gear) return res.status(404).json({ message: "Not found" });
  res.json(gear);
};

module.exports = { getAllGear, getGearById, addGear, deleteGear, updateGear };
