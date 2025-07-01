const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.route");
const gearRoutes = require("./routes/gear.route");
const bookingRoutes = require("./routes/booking.route");
const campgroundRoutes = require("./routes/campground.route");
const aiRoutes = require("./routes/ai.route");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/gear", gearRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/campgrounds", campgroundRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("CampMate LK API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
