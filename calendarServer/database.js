// database.js

const mysql = require('mysql2');  // Import mysql2 library

// Create a single connection instance
const connection = mysql.createConnection({
  host: 'localhost',          // Your database host
  user: 'root',      // Your database username
  password: '',  // Your database password
  database: 'testplanning'    // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
  console.log('Connected to the MySQL database');
});

// Export a function to execute queries
module.exports = {
  query: (sql, params) => {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, results) => {
        if (err) {
          reject(err); // Handle errors
        } else {
          resolve(results); // Return results
        }
      });
    });
  }
};