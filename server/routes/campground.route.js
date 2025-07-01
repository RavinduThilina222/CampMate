const express = require("express");
const { getAllCampgrounds, addCampground } = require("../controllers/campground.controller");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllCampgrounds);
router.post("/", verifyToken, isAdmin, addCampground);

module.exports = router;
