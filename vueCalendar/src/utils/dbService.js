import db from './database'; // Import your DB connection setup

export async function fetchEventsFromDB() {
  const result = await db.query('SELECT * FROM events'); // Adjust query as needed
  return result.rows;
}

export async function fetchEmployeesFromDB() {
  const result = await db.query('SELECT * FROM employees'); // Adjust query as needed
  return result.rows;
}

export async function fetchHolidaysFromDB() {
  const result = await db.query('SELECT * FROM holidays'); // Adjust query as needed
  return result.rows;
}
