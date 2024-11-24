// controllers/eventController.js

const { getAllEvents } = require('../services/eventService'); // Import your service or DB functions

exports.fetchEvents = async (req, res) => {
  try {
    const events = await getAllEvents(); // Replace with your DB query or ORM call
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};
