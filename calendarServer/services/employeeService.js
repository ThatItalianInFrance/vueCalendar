// services/employeeService.js

const db = require('../database');

exports.getAllEmployees = async () => {
  try {
    const result = await db.query('SELECT * FROM employees');
    return result;
  } catch (error) {
    console.error('Error fetching plannings from DB:', error);
    throw error;
  }
};
