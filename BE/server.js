const express = require('express');
const dotenv = require('dotenv');
const crimeRoutes = require('./routes/crimeRoutes'); // Import the routes
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api', crimeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});