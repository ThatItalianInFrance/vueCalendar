// controllers/resourceController.js

const { getAllResources } = require('../services/resourceService');

exports.fetchResources = async (req, res) => {
  try {
    const resources = await getAllResources();
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};
