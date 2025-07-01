const express = require("express");
const { generateChecklist, generateItinerary, generateTips } = require("../controllers/ai.controller");
const router = express.Router();

router.post("/checklist", generateChecklist);
router.post("/itinerary", generateItinerary);
router.post("/camping-advice", generateTips); // Endpoint for generating camping advice

module.exports = router;
