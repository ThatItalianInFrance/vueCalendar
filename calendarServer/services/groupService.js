const db = require('../database'); // Database connection instance

// Get all groups
exports.getAllGroups = async () => {
  try {
    const result = await db.query('SELECT * FROM groupe');
    return result
  } catch(e) {
    console.log(e);
    
  }
  console.log(result);
  console.log("this");
  
  
};

// Get a single group by ID
exports.getGroupById = async (id) => {
  return db.query('SELECT * FROM groups WHERE id = ?', [id]);
};

// Create a new group
exports.createGroup = async (groupData) => {
  return db.query('INSERT INTO groups (name, description) VALUES (?, ?)', [groupData.name, groupData.description]);
};

// Update an existing group
exports.updateGroup = async (id, groupData) => {
  return db.query('UPDATE groups SET name = ?, description = ? WHERE id = ?', [groupData.name, groupData.description, id]);
};

// Delete a group
exports.deleteGroup = async (id) => {
  return db.query('DELETE FROM groups WHERE id = ?', [id]);
};