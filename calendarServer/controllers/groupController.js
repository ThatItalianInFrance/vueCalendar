// controllers/groupController.js
const {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup
} = require('../services/groupService');

// Get all groups
exports.getAllGroups = async (req, res) => {
  
  try {
    const groups = await getAllGroups();

    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};

// Get group by ID
exports.getGroupById = async (req, res) => {
  try {
    const group = await getGroupById(req.params.id);
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch group' });
  }
};

// Create a new group
exports.createGroup = async (req, res) => {
  try {
    await createGroup(req.body);
    res.status(201).json({ message: 'Group created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
};

// Update a group
exports.updateGroup = async (req, res) => {
  try {
    await updateGroup(req.params.id, req.body);
    res.json({ message: 'Group updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update group' });
  }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
  try {
    await deleteGroup(req.params.id);
    res.json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group' });
  }
};
