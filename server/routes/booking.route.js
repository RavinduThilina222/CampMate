const express = require("express");
const {
  createBooking,
  getUserBookings,
} = require("./../controllers/booking.controller");
const { verifyToken } = require("./../middleware/authMiddleware");
const router = express.Router();

router.post("/", createBooking);
router.get("/:userId", getUserBookings);

module.exports = router;
