// services/employeeService.js

const db = require('../database');

exports.getAllPlannings = async () => {
  try {
    const result = await db.query('SELECT * FROM plannings');
    return result;
  } catch (error) {
    console.error('Error fetching employees from DB:', error);
    throw error;
  }
};
