// controllers/holidayController.js

const { getAllHolidays } = require('../services/holidayService');

exports.fetchHolidays = async (req, res) => {
  try {
    const holidays = await getAllHolidays();
    res.status(200).json(holidays);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({ error: 'Failed to fetch holidays' });
  }
};
