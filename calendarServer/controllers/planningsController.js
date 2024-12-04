// controllers/employeeController.js

const {
  getAllPlannings,
  getPlanningById,
  createPlanning,
  updatePlanning,
  deletePlanning,
} = require('../services/planningService');

// Fetch all plannings
exports.fetchPlannings = async (req, res) => {
  try {
    const plannings = await getAllPlannings();
    res.status(200).json(plannings);
  } catch (error) {
    console.error('Error fetching plannings:', error);
    res.status(500).json({ error: 'Failed to fetch plannings' });
  }
};

// Fetch a single planning by ID
exports.fetchPlanningById = async (req, res) => {
  try {
    const { id } = req.params;
    const planning = await getPlanningById(id);
    res.status(200).json(planning);
  } catch (error) {
    console.error(`Error fetching planning with ID ${req.params.id}:`, error);
    res.status(404).json({ error: 'Planning not found' });
  }
};

// Create a new planning
exports.createPlanning = async (req, res) => {
  try {
    const planningData = req.body;
    console.log(req.body);
    
    const newPlanning = await createPlanning(planningData);
    res.status(201).json(newPlanning);
  } catch (error) {
    console.error('Error creating planning:', error);
    res.status(400).json({ error: 'Failed to create planning' });
  }
};

// Update an existing planning
exports.updatePlanning = async (req, res) => {
  try {
    const { id } = req.params;
    const planningData = req.body;
    const updatedPlanning = await updatePlanning(id, planningData);
    res.status(200).json(updatedPlanning);
  } catch (error) {
    console.error(`Error updating planning with ID ${req.params.id}:`, error);
    res.status(400).json({ error: 'Failed to update planning' });
  }
};

// Delete a planning
exports.deletePlanning = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePlanning(id);
    res.status(200).json({ message: 'Planning deleted successfully' });
  } catch (error) {
    console.error(`Error deleting planning with ID ${req.params.id}:`, error);
    res.status(404).json({ error: 'Failed to delete planning' });
  }
};

