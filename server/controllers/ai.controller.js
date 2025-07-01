const OpenAI = require('openai');

// Initialize OpenAI with API key from environment
let openai;
try {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('Warning: OPENAI_API_KEY environment variable not set. AI features will use fallback responses.');
    openai = null;
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error.message);
  openai = null;
}

// Generate AI-powered packing checklist
const generateChecklist = async (req, res) => {
  try {
    const { destination, duration, season, activities, groupSize } = req.body;

    // Validate required fields
    if (!destination || !duration || !season) {
      return res.status(400).json({ 
        message: "Destination, duration, and season are required" 
      });
    }

    // Check if OpenAI is available
    if (!openai) {
      console.log('OpenAI not available, using fallback checklist');
      const fallbackChecklist = {
        essentials: ["Tent", "Sleeping bag", "Pillow", "Flashlight", "First aid kit"],
        clothing: ["Weather-appropriate clothing", "Extra underwear", "Socks", "Rain gear"],
        gear: ["Backpack", "Water bottles", "Camping chair", "Rope/paracord"],
        food_cooking: ["Food supplies", "Cooking utensils", "Portable stove", "Matches/lighter"],
        safety_first_aid: ["First aid kit", "Emergency whistle", "Sunscreen", "Insect repellent"],
        comfort_convenience: ["Toiletries", "Towel", "Toilet paper", "Hand sanitizer"],
        activity_specific: activities ? [`Gear for ${Array.isArray(activities) ? activities.join(', ') : activities}`] : ["General outdoor equipment"]
      };

      return res.json({ 
        success: true,
        message: "Using fallback checklist (AI service not configured)", 
        tripDetails: { destination, duration, season, activities, groupSize },
        checklist: fallbackChecklist,
        generatedAt: new Date().toISOString(),
        usingFallback: true
      });
    }

    // Create a detailed prompt for OpenAI
    const prompt = `Create a comprehensive camping packing checklist for:
- Destination: ${destination}
- Duration: ${duration} days
- Season: ${season}
- Activities: ${activities ? (Array.isArray(activities) ? activities.join(', ') : activities) : 'General camping'}
- Group size: ${groupSize || 1} people

Please provide a detailed packing list organized by categories. Format the response as a JSON object with the following structure:
{
  "essentials": ["item1", "item2", ...],
  "clothing": ["item1", "item2", ...],
  "gear": ["item1", "item2", ...],
  "food_cooking": ["item1", "item2", ...],
  "safety_first_aid": ["item1", "item2", ...],
  "comfort_convenience": ["item1", "item2", ...],
  "activity_specific": ["item1", "item2", ...]
}

Consider the specific destination, weather conditions for the season, planned activities, and group size.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert camping and outdoor adventure guide with years of experience. Provide practical, detailed packing advice based on specific trip parameters. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    let checklist;
    try {
      // Try to parse the response as JSON
      const content = completion.choices[0].message.content;
      // Remove any markdown formatting if present
      const jsonString = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      checklist = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      // Fallback to structured response
      checklist = {
        essentials: ["Tent", "Sleeping bag", "Pillow", "Flashlight", "First aid kit"],
        clothing: ["Weather-appropriate clothing", "Extra socks", "Rain gear"],
        gear: ["Backpack", "Water bottles", "Camping chair"],
        food_cooking: ["Food supplies", "Cooking utensils", "Matches/lighter"],
        safety_first_aid: ["First aid kit", "Emergency whistle", "Map and compass"],
        comfort_convenience: ["Sunscreen", "Insect repellent", "Toiletries"],
        activity_specific: ["Activity-specific gear based on your plans"],
        ai_note: "Generated using fallback due to parsing error"
      };
    }

    res.json({
      success: true,
      tripDetails: {
        destination,
        duration,
        season,
        activities,
        groupSize
      },
      checklist,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback response if OpenAI fails
    const fallbackChecklist = {
      essentials: ["Tent", "Sleeping bag", "Pillow", "Flashlight", "First aid kit"],
      clothing: ["Weather-appropriate clothing", "Extra underwear", "Socks", "Rain gear"],
      gear: ["Backpack", "Water bottles", "Camping chair", "Rope/paracord"],
      food_cooking: ["Food supplies", "Cooking utensils", "Portable stove", "Matches/lighter"],
      safety_first_aid: ["First aid kit", "Emergency whistle", "Sunscreen", "Insect repellent"],
      comfort_convenience: ["Toiletries", "Towel", "Toilet paper", "Hand sanitizer"],
      activity_specific: activities ? [`Gear for ${Array.isArray(activities) ? activities.join(', ') : activities}`] : ["General outdoor equipment"]
    };

    res.status(500).json({ 
      success: false,
      message: "AI service temporarily unavailable, using fallback checklist", 
      tripDetails: { destination, duration, season, activities, groupSize },
      checklist: fallbackChecklist,
      generatedAt: new Date().toISOString(),
      error: error.message 
    });
  }
};

// Generate AI-powered itinerary
const generateItinerary = async (req, res) => {
  try {
    const { destination, duration, interests, budget, startDate } = req.body;

    // Validate required fields
    if (!destination || !duration) {
      return res.status(400).json({ 
        message: "Destination and duration are required" 
      });
    }

    // Check if OpenAI is available
    if (!openai) {
      console.log('OpenAI not available, using fallback itinerary');
      const fallbackItinerary = {};
      const days = parseInt(duration) || 3;
      
      for (let day = 1; day <= days; day++) {
        fallbackItinerary[`day_${day}`] = {
          morning: `Day ${day} Morning: Set up camp and explore immediate surroundings`,
          afternoon: `Day ${day} Afternoon: ${interests ? `Enjoy ${Array.isArray(interests) ? interests[0] : interests}` : 'Outdoor activities'}`,
          evening: `Day ${day} Evening: Campfire, stargazing, and group activities`,
          notes: `Adjust activities based on weather conditions and group energy levels`
        };
      }

      return res.json({ 
        success: true,
        message: "Using fallback itinerary (AI service not configured)", 
        tripDetails: { destination, duration, interests, budget, startDate },
        itinerary: fallbackItinerary,
        generatedAt: new Date().toISOString(),
        usingFallback: true
      });
    }

    // Create a detailed prompt for OpenAI
    const prompt = `Create a detailed ${duration}-day camping itinerary for ${destination}.

Trip Details:
- Destination: ${destination}
- Duration: ${duration} days
- Interests: ${interests ? (Array.isArray(interests) ? interests.join(', ') : interests) : 'General outdoor activities'}
- Budget: ${budget || 'Moderate'}
- Start date: ${startDate || 'Flexible'}

Please create a day-by-day itinerary with the following JSON format:
{
  "day_1": {
    "morning": "Activity description",
    "afternoon": "Activity description", 
    "evening": "Activity description",
    "notes": "Important notes or tips for the day"
  },
  "day_2": { ... },
  ...
}

Include specific activities, timing suggestions, local attractions, estimated costs where relevant, and practical tips for each day.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner specializing in camping and outdoor adventures. Create detailed, practical itineraries with specific activities, timing, and helpful tips. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    let itinerary;
    try {
      // Try to parse the response as JSON
      const content = completion.choices[0].message.content;
      // Remove any markdown formatting if present
      const jsonString = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      itinerary = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      // Fallback to structured response
      itinerary = {};
      const days = parseInt(duration) || 3;
      
      for (let day = 1; day <= days; day++) {
        itinerary[`day_${day}`] = {
          morning: `Day ${day} Morning: Arrival and setup activities`,
          afternoon: `Day ${day} Afternoon: Explore local attractions`,
          evening: `Day ${day} Evening: Campfire and relaxation`,
          notes: `Plan activities based on weather and group preferences`
        };
      }
      itinerary.ai_note = "Generated using fallback due to parsing error";
    }

    res.json({
      success: true,
      tripDetails: {
        destination,
        duration,
        interests,
        budget,
        startDate
      },
      itinerary,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Fallback response if OpenAI fails
    const fallbackItinerary = {};
    const days = parseInt(duration) || 3;
    
    for (let day = 1; day <= days; day++) {
      fallbackItinerary[`day_${day}`] = {
        morning: `Day ${day} Morning: Set up camp and explore immediate surroundings`,
        afternoon: `Day ${day} Afternoon: ${interests ? `Enjoy ${Array.isArray(interests) ? interests[0] : interests}` : 'Outdoor activities'}`,
        evening: `Day ${day} Evening: Campfire, stargazing, and group activities`,
        notes: `Adjust activities based on weather conditions and group energy levels`
      };
    }

    res.status(500).json({ 
      success: false,
      message: "AI service temporarily unavailable, using fallback itinerary", 
      tripDetails: { destination, duration, interests, budget, startDate },
      itinerary: fallbackItinerary,
      generatedAt: new Date().toISOString(),
      error: error.message 
    });
  }
};

// Generate camping tips based on conditions
const generateTips = async (req, res) => {
  try {
    const { weather, terrain, experience, destination } = req.body;

    // Check if OpenAI is available
    if (!openai) {
      console.log('OpenAI not available, using fallback tips');
      const fallbackTips = {
        safety_tips: ["Always inform someone of your camping plans", "Check weather conditions before departure", "Carry emergency communication device"],
        comfort_tips: ["Pack layers for temperature changes", "Bring extra food and water", "Set up camp before dark"],
        gear_recommendations: ["Quality tent", "Reliable flashlight", "First aid kit", "Multi-tool", "Weather radio"],
        weather_specific: [`Prepare for ${weather || 'variable'} conditions`, "Check forecast regularly", "Pack appropriate rain gear"],
        terrain_specific: [`Suitable footwear for ${terrain || 'mixed'} terrain`, "Research trail conditions", "Bring navigation tools"],
        experience_level_advice: [`Tips tailored for ${experience || 'beginner'} level campers`, "Start with shorter trips", "Learn basic outdoor skills"]
      };

      return res.json({
        success: true,
        message: "Using fallback tips (AI service not configured)",
        conditions: { weather, terrain, experience, destination },
        tips: fallbackTips,
        generatedAt: new Date().toISOString(),
        usingFallback: true
      });
    }

    const prompt = `Provide expert camping tips for the following conditions:
- Weather conditions: ${weather || 'Variable'}
- Terrain type: ${terrain || 'Mixed'}
- Experience level: ${experience || 'Beginner'}
- Destination: ${destination || 'General camping'}

Provide practical, actionable advice in JSON format:
{
  "safety_tips": ["tip1", "tip2", ...],
  "comfort_tips": ["tip1", "tip2", ...],
  "gear_recommendations": ["item1", "item2", ...],
  "weather_specific": ["tip1", "tip2", ...],
  "terrain_specific": ["tip1", "tip2", ...],
  "experience_level_advice": ["tip1", "tip2", ...]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert camping instructor with extensive outdoor experience. Provide clear, practical, and safety-focused advice for campers. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    let tips;
    try {
      const content = completion.choices[0].message.content;
      const jsonString = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      tips = JSON.parse(jsonString);
    } catch (parseError) {
      // Fallback tips
      tips = {
        safety_tips: ["Always inform someone of your camping plans", "Check weather conditions before departure"],
        comfort_tips: ["Pack layers for temperature changes", "Bring extra food and water"],
        gear_recommendations: ["Quality tent", "Reliable flashlight", "First aid kit"],
        weather_specific: [`Prepare for ${weather || 'variable'} conditions`],
        terrain_specific: [`Suitable footwear for ${terrain || 'mixed'} terrain`],
        experience_level_advice: [`Tips tailored for ${experience || 'beginner'} level campers`]
      };
    }

    res.json({
      success: true,
      conditions: { weather, terrain, experience, destination },
      tips,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      success: false,
      message: "Failed to generate tips", 
      error: error.message 
    });
  }
};

module.exports = { 
  generateChecklist, 
  generateItinerary, 
  generateTips 
};