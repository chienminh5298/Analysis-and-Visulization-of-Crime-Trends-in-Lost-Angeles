const express = require('express');
const dotenv = require('dotenv');
const crimeRoutes = require('./routes/crimeRoutes'); // Import the routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', crimeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});