const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  gearItems: [
    {
      gearId: { type: mongoose.Schema.Types.ObjectId, ref: "Gear" },
      name: String,
      quantity: Number,
      pricePerDay: Number,
      rentalStart: Date,
      rentalEnd: Date,
      totalDays: Number,
      totalPrice: Number,
    },
  ],
  gearItemLocation:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "RentalLocation",
  },
  totalAmount: Number,
  status: { type: String, default: "Pending" }, // 'Confirmed', 'Returned', 'Cancelled','Rented'
  paymentStatus: { type: String, default: "Pending" }, // 'Paid', 'Unpaid'
  deliveryMethod: String,
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
