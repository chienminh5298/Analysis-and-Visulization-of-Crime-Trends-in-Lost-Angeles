const express = require('express');
const router = express.Router();
const { executeQuery}  = require('../db/utils');
const { LatLonRange } = require('../db/utils');

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

// Fetch # of crimes per month at {LAT} and {LON} during {YEAR}
// [0] = January and [11] = December
router.get('/crime-count', async (req, res) => {
  const { lat, lon, year } = req.query; // Extract latitude, longitude, and year from query parameters

  // Validate inputs
  if (!lat || !lon || !year) {
    return res.status(400).json({ message: 'Latitude, longitude, and year are required' });
  }

  try {
    const { lat_min, lat_max, lon_min, lon_max } = LatLonRange(Number(lat), Number(lon));

    // Execute the query
    const result = await executeQuery(
      `SELECT 
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '01' THEN DR_NO END) AS January,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '02' THEN DR_NO END) AS February,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '03' THEN DR_NO END) AS March,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '04' THEN DR_NO END) AS April,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '05' THEN DR_NO END) AS May,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '06' THEN DR_NO END) AS June,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '07' THEN DR_NO END) AS July,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '08' THEN DR_NO END) AS August,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '09' THEN DR_NO END) AS September,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '10' THEN DR_NO END) AS October,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '11' THEN DR_NO END) AS November,
        COUNT(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '12' THEN DR_NO END) AS December
      FROM CrimeIncident
      WHERE LAT BETWEEN :lat_min AND :lat_max
        AND LON BETWEEN :lon_min AND :lon_max
        AND TO_CHAR(Date_Rptd, 'YYYY') = :year`,
      { lat_min, lat_max, lon_min, lon_max, year }
    );

    // Send the result as JSON (single row with 12 columns for months)
    res.json({
      message: 'Crime count data fetched successfully!',
      data: result.rows[0], // Single row with 12 columns for months
    });
  } catch (error) {
    console.error('Error fetching crime count data:', error);
    res.status(500).json({
      message: 'Failed to fetch crime count data',
      error: error.message,
    });
  }
});

// Fetch count of victims age for each month at {LAT} and {LON} in the year {YEAR}
// [0] = January and [11] = December
router.get('/victims-age', async (req, res) => {
  const { lat, lon, year } = req.query; // Extract latitude and longitude from query parameters

  // Validate
  if (!lat || !lon || !year) {
    return res.status(400).json({ message: 'Latitude, longitude, and year are required' });
  }

  try {
    const { lat_min, lat_max, lon_min, lon_max } = LatLonRange(Number(lat), Number(lon));

    const result = await executeQuery(
      `SELECT 
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '01' THEN Vict_Age END) AS January,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '02' THEN Vict_Age END) AS February,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '03' THEN Vict_Age END) AS March,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '04' THEN Vict_Age END) AS April,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '05' THEN Vict_Age END) AS May,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '06' THEN Vict_Age END) AS June,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '07' THEN Vict_Age END) AS July,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '08' THEN Vict_Age END) AS August,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '09' THEN Vict_Age END) AS September,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '10' THEN Vict_Age END) AS October,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '11' THEN Vict_Age END) AS November,
        AVG(CASE WHEN TO_CHAR(Date_Rptd, 'MM') = '12' THEN Vict_Age END) AS December
      FROM Victim v
      JOIN CrimeIncident ci ON ci.DR_NO = v.DR_NO
      WHERE LAT BETWEEN :lat_min AND :lat_max
        AND LON BETWEEN :lon_min AND :lon_max
        AND TO_CHAR(Date_Rptd, 'YYYY') = :year`,
      { lat_min, lat_max, lon_min, lon_max, year }
    );

    // Send the query result as JSON
    res.json({
      data: result.rows[0], // Single row with 12 columns for months
    });
  } catch (error) {
    console.error('Error fetching victim data:', error);
    res.status(500).json({
      message: 'Failed to fetch victim data',
      error: error.message,
    });
  }
});

// Fetch count of victims age for each month at {LAT} and {LON} in the year {YEAR}
// { "month": "01", "Vict_Sex": "M", "count": 15 }
router.get('/victims-sex', async (req, res) => {
  const { lat, lon, year } = req.query; // Extract latitude and longitude from query parameters

  // Validate
  if (!lat || !lon || !year) {
    return res.status(400).json({ message: 'Latitude, longitude, and year are required' });
  }

  try {
    const { lat_min, lat_max, lon_min, lon_max } = LatLonRange(Number(lat), Number(lon));

    const result = await executeQuery(
      `SELECT 
        TO_CHAR(Date_Rptd, 'MM') AS month,
        Vict_Sex,
        COUNT(*) AS count
      FROM Victim v
      JOIN CrimeIncident ci ON ci.DR_NO = v.DR_NO
      WHERE ci.LAT BETWEEN :lat_min AND :lat_max
        AND ci.LON BETWEEN :lon_min AND :lon_max
        AND TO_CHAR(ci.Date_Rptd, 'YYYY') = :year
      GROUP BY TO_CHAR(Date_Rptd, 'MM'), Vict_Sex
      ORDER BY TO_CHAR(Date_Rptd, 'MM'), Vict_Sex`,
      { lat_min, lat_max, lon_min, lon_max, year }
    );

    // Send the query result as JSON
    res.json({
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching victim data:', error);
    res.status(500).json({
      message: 'Failed to fetch victim data',
      error: error.message,
    });
  }
});

// Fetch weapons at {LAT} and {LON}
router.get('/weapons', async (req, res) => {
  const { lat, lon, year } = req.query; // Extract latitude, longitude, and year from query parameters

  // Validate inputs
  if (!lat || !lon || !year) {
    return res.status(400).json({ message: 'Latitude, longitude, and year are required' });
  }

  try {
    const { lat_min, lat_max, lon_min, lon_max } = LatLonRange(Number(lat), Number(lon));

    const result = await executeQuery(
      `SELECT 
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '01' THEN ci.DR_NO END) AS January,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '02' THEN ci.DR_NO END) AS February,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '03' THEN ci.DR_NO END) AS March,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '04' THEN ci.DR_NO END) AS April,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '05' THEN ci.DR_NO END) AS May,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '06' THEN ci.DR_NO END) AS June,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '07' THEN ci.DR_NO END) AS July,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '08' THEN ci.DR_NO END) AS August,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '09' THEN ci.DR_NO END) AS September,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '10' THEN ci.DR_NO END) AS October,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '11' THEN ci.DR_NO END) AS November,
        COUNT(CASE WHEN TO_CHAR(ci.Date_Rptd, 'MM') = '12' THEN ci.DR_NO END) AS December
      FROM Incident_Weapon w
      JOIN CrimeIncident ci ON ci.DR_NO = w.DR_NO
      WHERE ci.LAT BETWEEN :lat_min AND :lat_max
        AND ci.LON BETWEEN :lon_min AND :lon_max
        AND TO_CHAR(ci.Date_Rptd, 'YYYY') = :year
        AND w.Weapon_Used_Cd IS NOT NULL`,
      { lat_min, lat_max, lon_min, lon_max, year }
    );

    // Send the query result as JSON
    res.json({
      data: result.rows[0], // Single row with 12 columns for months,
    });
  } catch (error) {
    console.error('Error fetching weapon data:', error);
    res.status(500).json({
      message: 'Failed to fetch weapon data',
      error: error.message,
    });
  }
});

module.exports = router;