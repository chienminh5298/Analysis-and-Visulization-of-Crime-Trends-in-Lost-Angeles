const express = require('express');
const router = express.Router();
const executeQuery = require('../db/utils'); // Adjust the path

// Test database connection
router.get('/test-connection', async (req, res) => {
  try {
    const result = await executeQuery('SELECT 1 AS result FROM DUAL');
    res.json({
      message: 'Database connection successful!',
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

// Fetch first 5 rows from Victim table
router.get('/victims', async (req, res) => {
  try {
    const result = await executeQuery(
      `SELECT * FROM Victim FETCH FIRST 5 ROWS ONLY`
    );
    res.json({
      message: 'Victim data fetched successfully!',
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch victim data',
      error: error.message,
    });
  }
});

module.exports = router;