const db = require('../database'); // Database connection instance

// Fetch all employees
exports.getAllEmployees = async () => {
  try {
    const result = await db.query('SELECT * FROM employees');
    return result;
  } catch (error) {
    console.error('Error fetching employees from DB:', error);
    throw error;
  }
};

// Fetch a single employee by ID
exports.getEmployeeById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM employees WHERE employee_id = ?', [id]);
    return result[0];
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    throw error;
  }
};

// Create a new employee
exports.createEmployee = async (employeeData) => {
  try {
    const { first_name, last_name, email, hire_date, department, logo } = employeeData;
    const [result] = await db.query(
      'INSERT INTO employees (first_name, last_name, email, hire_date, department, logo) VALUES (?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, hire_date, department, logo]
    );
    return { employee_id: result.insertId, ...employeeData };
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

// Update an existing employee by ID
exports.updateEmployee = async (id, employeeData) => {
  try {
    const { first_name, last_name, email, hire_date, department, logo } = employeeData;
    await db.query(
      'UPDATE employees SET first_name = ?, last_name = ?, email = ?, hire_date = ?, department = ?, logo = ? WHERE employee_id = ?',
      [first_name, last_name, email, hire_date, department, logo, id]
    );
    return { employee_id: id, ...employeeData };
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM employees WHERE employee_id = ?', [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

