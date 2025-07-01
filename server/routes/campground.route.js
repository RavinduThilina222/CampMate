const express = require("express");
const { getAllCampgrounds, addCampground, updateCampground } = require("../controllers/campground.controller");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllCampgrounds);
router.post("/", verifyToken, isAdmin, addCampground);
router.put("/:id", verifyToken, isAdmin, updateCampground);

module.exports = router;
