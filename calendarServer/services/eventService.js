// services/eventService.js

const db = require('../database'); // Your database connection or ORM instance

// Fetch all events from the database
exports.getAllEvents = async () => {
  try {
    const result = await db.query('SELECT * FROM events'); // Adjust query as needed
    // console.log(result);
    
    return result; // For an ORM, it might be something like: return Event.findAll();
  } catch (error) {
    console.error('Error fetching events from DB:', error);
    throw error; // Propagate error to the controller
  }
};
