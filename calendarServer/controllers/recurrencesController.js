// controllers/employeeController.js

const { getAllRecurrences } = require('../services/recurrencesService');

exports.fetchRecurrences = async (req, res) => {
  try {
    const recurrences = await getAllRecurrences();
    res.status(200).json(recurrences);
  } catch (error) {
    console.error('Error fetching recurrences:', error);
    res.status(500).json({ error: 'Failed to fetch recurrences' });
  }
};
