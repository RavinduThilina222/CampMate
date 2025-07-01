const express = require("express");
const {
  createBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
} = require("./../controllers/booking.controller");
const { verifyToken } = require("./../middleware/authMiddleware");
const router = express.Router();

router.post("/", createBooking);
router.get("/:userId", getUserBookings);
router.put("/:id", verifyToken, updateBooking);
router.delete("/:id", verifyToken, deleteBooking);

module.exports = router;
