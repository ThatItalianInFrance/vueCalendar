// controllers/employeeController.js

const { getAllPlannings } = require('../services/planningService');

exports.fetchPlannings = async (req, res) => {
  try {
    const plannings = await getAllPlannings();
    res.status(200).json(plannings);
  } catch (error) {
    console.error('Error fetching plannings:', error);
    res.status(500).json({ error: 'Failed to fetch plannings' });
  }
};
