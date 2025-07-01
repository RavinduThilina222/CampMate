const express = require("express");
const { getAllGear, addGear } = require("./../controllers/gear.controller");
const { verifyToken, isAdmin } = require("./../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllGear);
router.post("/", verifyToken, isAdmin, addGear);

module.exports = router;
