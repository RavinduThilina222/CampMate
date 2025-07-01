const express = require("express");
const { getAllGear, addGear,getGearById, deleteGear } = require("./../controllers/gear.controller");
const { verifyToken, isAdmin } = require("./../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllGear);
router.post("/", verifyToken, isAdmin, addGear);
router.get("/:id", getGearById);
router.delete("/:id", verifyToken, isAdmin, deleteGear);

module.exports = router;
