const generateChecklist = async (req, res) => {
  try {
    const { destination, duration, season, activities } = req.body;
    
    // Basic AI-like logic to generate a packing checklist
    const baseItems = [
      "Tent", "Sleeping bag", "Pillow", "Camping chair", "Flashlight", 
      "First aid kit", "Water bottles", "Food supplies", "Cooking utensils",
      "Matches/lighter", "Sunscreen", "Insect repellent"
    ];
    
    const seasonalItems = {
      winter: ["Winter jacket", "Thermal underwear", "Warm socks", "Gloves", "Hat"],
      summer: ["Swimwear", "Sun hat", "Shorts", "Tank tops", "Sandals"],
      spring: ["Light jacket", "Rain gear", "Layers", "Waterproof boots"],
      fall: ["Warm jacket", "Long pants", "Sweater", "Rain gear"]
    };
    
    const activityItems = {
      hiking: ["Hiking boots", "Backpack", "Trekking poles", "Trail map"],
      fishing: ["Fishing rod", "Tackle box", "Bait", "Fishing license"],
      swimming: ["Swimwear", "Towel", "Goggles", "Pool float"],
      photography: ["Camera", "Extra batteries", "Memory cards", "Tripod"]
    };
    
    let checklist = [...baseItems];
    
    if (season && seasonalItems[season.toLowerCase()]) {
      checklist = [...checklist, ...seasonalItems[season.toLowerCase()]];
    }
    
    if (activities && Array.isArray(activities)) {
      activities.forEach(activity => {
        if (activityItems[activity.toLowerCase()]) {
          checklist = [...checklist, ...activityItems[activity.toLowerCase()]];
        }
      });
    }
    
    // Remove duplicates
    checklist = [...new Set(checklist)];
    
    res.json({
      destination,
      duration,
      season,
      activities,
      checklist,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateItinerary = async (req, res) => {
  try {
    const { destination, duration, interests, budget } = req.body;
    
    // Basic AI-like logic to generate an itinerary
    const activities = {
      nature: ["Nature walk", "Bird watching", "Stargazing", "Photography"],
      adventure: ["Hiking", "Rock climbing", "Kayaking", "Mountain biking"],
      relaxation: ["Reading by the campfire", "Meditation", "Fishing", "Hammock time"],
      social: ["Group games", "Storytelling", "Cooking together", "Music session"]
    };
    
    const budgetActivities = {
      low: ["Free hiking trails", "Self-guided nature walks", "Campfire activities"],
      medium: ["Guided tours", "Equipment rental", "Local attractions"],
      high: ["Premium tours", "Adventure activities", "Fine dining experiences"]
    };
    
    let itinerary = [];
    const days = parseInt(duration) || 3;
    
    for (let day = 1; day <= days; day++) {
      let dayActivities = [];
      
      // Morning activity
      if (interests && interests.includes("nature")) {
        dayActivities.push(`Morning: ${activities.nature[Math.floor(Math.random() * activities.nature.length)]}`);
      } else if (interests && interests.includes("adventure")) {
        dayActivities.push(`Morning: ${activities.adventure[Math.floor(Math.random() * activities.adventure.length)]}`);
      } else {
        dayActivities.push("Morning: Breakfast and camp setup");
      }
      
      // Afternoon activity
      if (interests && interests.includes("adventure")) {
        dayActivities.push(`Afternoon: ${activities.adventure[Math.floor(Math.random() * activities.adventure.length)]}`);
      } else {
        dayActivities.push(`Afternoon: ${activities.nature[Math.floor(Math.random() * activities.nature.length)]}`);
      }
      
      // Evening activity
      dayActivities.push(`Evening: ${activities.social[Math.floor(Math.random() * activities.social.length)]}`);
      
      itinerary.push({
        day: day,
        activities: dayActivities
      });
    }
    
    res.json({
      destination,
      duration: days,
      interests,
      budget,
      itinerary,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateChecklist, generateItinerary };
