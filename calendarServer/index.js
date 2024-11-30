// app.js or server.js

const express = require('express');
const cors = require('cors');  // Import CORS middleware
const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON requests

// Enable CORS for all routes
app.use(cors());

// Use API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
