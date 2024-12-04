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

// Fetch a planning by ID
exports.getPlanningById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM plannings WHERE planning_id = ?', [id]);
    if (result.length === 0) {
      throw new Error('Planning not found');
    }
    return result[0];
  } catch (error) {
    console.error(`Error fetching planning with ID ${id}:`, error);
    throw error;
  }
};

// Create a new planning
exports.createPlanning = async (planningData) => {
  try {
    console.log("this");
    
    const { group_id, planning_name, date, start_time, end_time, status, days_of_the_week, weeks_of_the_month, months_of_the_year } = planningData;
    const result = await db.query(
      'INSERT INTO plannings (group_id, planning_name, date, start_time, end_time, status, days_of_the_week, weeks_of_the_month, months_of_the_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',

      [group_id, planning_name, date, start_time, end_time, status, days_of_the_week, weeks_of_the_month, months_of_the_year]
    );
    return { planning_id: result.insertId, ...planningData };
  } catch (error) {
    console.error('Error creating planning:', error);
    throw error;
  }
};

// Update an existing planning
exports.updatePlanning = async (id, planningData) => {
  try {
    const { employee_id, event_id, date, start_time, end_time, status, days_of_the_week } = planningData;
    const result = await db.query(
      'UPDATE plannings SET employee_id = ?, event_id = ?, date = ?, start_time = ?, end_time = ?, status = ?, days_of_the_week = ? WHERE planning_id = ?',
      [employee_id, event_id, date, start_time, end_time, status, days_of_the_week, id]
    );
    if (result.affectedRows === 0) {
      throw new Error('Planning not found or no changes made');
    }
    return { planning_id: id, ...planningData };
  } catch (error) {
    console.error(`Error updating planning with ID ${id}:`, error);
    throw error;
  }
};

// Delete a planning
exports.deletePlanning = async (id) => {
  try {
    const result = await db.query('DELETE FROM plannings WHERE planning_id = ?', [id]);
    if (result.affectedRows === 0) {
      throw new Error('Planning not found');
    }
    return { message: 'Planning deleted successfully' };
  } catch (error) {
    console.error(`Error deleting planning with ID ${id}:`, error);
    throw error;
  }
};
