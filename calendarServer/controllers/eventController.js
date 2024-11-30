const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../services/eventService');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await getAllEvents();
    console.log(events);
    
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get a single event by ID
exports.fetchEventById = async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = await createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await updateEvent(req.params.id, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const success = await deleteEvent(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

