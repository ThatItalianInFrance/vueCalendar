// services/eventService.js

const db = require('../database'); // Your database connection or ORM instance

// Fetch all events from the database
exports.getAllEvents = async () => {
  try {
    const result = await db.query('SELECT * FROM events'); // Adjust query if needed
    return result; // Result is an array of event objects
  } catch (error) {
    console.error('Error fetching events from DB:', error);
    throw error; // Propagate error to the controller
  }
};

// Fetch a single event by ID
exports.getEventById = async (id) => {
  try {
    const [result] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    return result[0]; // Return the first matching event or undefined
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw error;
  }
};

// Create a new event
exports.createEvent = async (eventData) => {
  try {
    const { resource_id, title, start, end, status, background_color } = eventData;
    const result = await db.query(
      'INSERT INTO events (resource_id, title, start, end, status, background_color) VALUES (?, ?, ?, ?, ?, ?)',
      [resource_id, title, start, end, status, background_color]
    );
    return { id: result.insertId, ...eventData }; // Return the created event with its ID
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update an existing event by ID
exports.updateEvent = async (id, eventData) => {
  try {
    const { resource_id, title, start, end, status, background_color } = eventData;
    await db.query(
      'UPDATE events SET resource_id = ?, title = ?, start = ?, end = ?, status = ?, background_color = ? WHERE id = ?',
      [resource_id, title, start, end, status, background_color, id]
    );
    return { id, ...eventData }; // Return the updated event data
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Delete an event by ID
exports.deleteEvent = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
    return result.affectedRows > 0; // Return true if an event was deleted, false otherwise
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

