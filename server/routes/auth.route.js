const express = require("express");
const { registerUser, loginUser, addAdmin } = require("./../controllers/auth.controller");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin", verifyToken, isAdmin, addAdmin); // Protected: only existing admins can create new admins
router.post("/setup-admin", addAdmin); // Initial setup: for creating the first admin (consider removing in production)

module.exports = router;
