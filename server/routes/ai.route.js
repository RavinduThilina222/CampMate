const express = require("express");
const { generateChecklist, generateItinerary } = require("../controllers/ai.controller");
const router = express.Router();

router.post("/checklist", generateChecklist);
router.post("/itinerary", generateItinerary);

module.exports = router;
