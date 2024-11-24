// services/resourceService.js

const db = require('../database');

exports.getAllResources = async () => {
  try {
    const result = await db.query('SELECT * FROM employees'); // Adjust table name if necessary
    return result;
  } catch (error) {
    console.error('Error fetching resources from DB:', error);
    throw error;
  }
};
