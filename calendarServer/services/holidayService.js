// services/holidayService.js

const db = require('../database');

exports.getAllHolidays = async () => {
  try {
    const result = await db.query('SELECT * FROM holidays');
    return result;
  } catch (error) {
    console.error('Error fetching holidays from DB:', error);
    throw error;
  }
};
