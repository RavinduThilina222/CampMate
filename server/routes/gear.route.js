const express = require("express");
const { getAllGear, addGear,getGearById, deleteGear, rentalByLocation,addRentalLocation,
    deleteRentalLocation, updateRentalLocation
 } = require("./../controllers/gear.controller");
const { verifyToken, isAdmin } = require("./../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllGear);
router.post("/", verifyToken, isAdmin, addGear);
router.get("/:id", getGearById);
router.delete("/:id", verifyToken, isAdmin, deleteGear);
router.get("/rental/:id", rentalByLocation);
router.post("/rental", verifyToken, isAdmin, addRentalLocation);
router.delete("/rental/:id/:locationId", verifyToken, isAdmin, deleteRentalLocation);
router.put("/rental/:id/:locationId", verifyToken, isAdmin, updateRentalLocation);

module.exports = router;
