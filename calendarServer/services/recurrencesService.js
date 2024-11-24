// services/employeeService.js

const db = require('../database');

exports.getAllRecurrences = async () => {
  try {
    const result = await db.query('SELECT * FROM recurrences');
    return result;
  } catch (error) {
    console.error('Error fetching recurrences from DB:', error);
    throw error;
  }
};
