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
router.get('/caseNumberTrend', async (req, res) => {
  const { lat, lon, year } = req.query;

  // Validate inputs
  if (!lat || !lon || !year) {
    return res.status(400).json({ message: 'Latitude, longitude, and year are required' });
  }

  try {
    const { lat_min, lat_max, lon_min, lon_max } = LatLonRange(Number(lat), Number(lon));

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

    // Reformat
    const columns = result.metaData.map(meta => meta.name); // Get column names
    const values = result.rows[0]; 

    const data = columns.map((month, index) => ({
      month,
      caseNums: values[index],
    }));

    // Send the formatted result as JSON
    res.json({
      message: 'Crime count data fetched successfully!',
      data,
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
router.get('/byAge', async (req, res) => {
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

    // Reformat
    const columns = result.metaData.map(meta => meta.name); // Get column names
    const values = result.rows[0];

    const data = columns.map((month, index) => ({
      month,
      age: values[index],
    }));

    // Send the query result as JSON
    res.json({
      data,
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
router.get('/byGender', async (req, res) => {
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
        AND Vict_Sex IS NOT NULL
      GROUP BY TO_CHAR(Date_Rptd, 'MM'), Vict_Sex
      ORDER BY TO_CHAR(Date_Rptd, 'MM'), Vict_Sex`,
      { lat_min, lat_max, lon_min, lon_max, year }
    );

    const rawData = result.rows;

    // Initialize array with default values for all months
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dataByMonth = months.map((month) => ({
      month,
      male: 0,
      female: 0,
      x: 0,
    }));

    // Process the raw data
    rawData.forEach(([month, Vict_Sex, count]) => {
      const monthIndex = parseInt(month, 10) - 1; // Convert '01' -> index 0
      if (monthIndex >= 0 && monthIndex < 12) {
        if (Vict_Sex === 'M') {
          dataByMonth[monthIndex].male += count;
        } else if (Vict_Sex === 'F') {
          dataByMonth[monthIndex].female += count;
        } else if (Vict_Sex === 'X') {
          dataByMonth[monthIndex].x += count;
        }
      }
    });

    // Send the query result as JSON
    res.json({
      data: dataByMonth,
    });
  } catch (error) {
    console.error('Error fetching victim data:', error);
    res.status(500).json({
      message: 'Failed to fetch victim data',
      error: error.message,
    });
  }
});

// Fetch count of victims descent for each month at {LAT} and {LON} in the year {YEAR}
router.get('/byRace', async (req, res) => {
  const { lat, lon, year } = req.query; // Extract latitude, longitude, and year from query parameters

  // Validate inputs
  if (!lat || !lon || !year) {
    return res.status(400).json({ message: 'Latitude, longitude, and year are required' });
  }

  try {
    const { lat_min, lat_max, lon_min, lon_max } = LatLonRange(Number(lat), Number(lon));

    const result = await executeQuery(
      `SELECT 
        TO_CHAR(Date_Rptd, 'MM') AS month,
        CASE 
          WHEN Vict_Descent IN ('A', 'C', 'D', 'F', 'G', 'J', 'K', 'L', 'P', 'S', 'U', 'V', 'Z') THEN 'Asian'
          WHEN Vict_Descent = 'B' THEN 'Black'
          WHEN Vict_Descent = 'H' THEN 'Hispanic'
          WHEN Vict_Descent = 'I' THEN 'nativeAmerican'
          WHEN Vict_Descent = 'W' THEN 'White'
          ELSE 'Other'
        END AS descent_group,
        COUNT(*) AS count
      FROM Victim v
      JOIN CrimeIncident ci ON ci.DR_NO = v.DR_NO
      WHERE ci.LAT BETWEEN :lat_min AND :lat_max
        AND ci.LON BETWEEN :lon_min AND :lon_max
        AND TO_CHAR(ci.Date_Rptd, 'YYYY') = :year
      GROUP BY TO_CHAR(Date_Rptd, 'MM'), 
               CASE 
                 WHEN Vict_Descent IN ('A', 'C', 'D', 'F', 'G', 'J', 'K', 'L', 'P', 'S', 'U', 'V', 'Z') THEN 'Asian'
                 WHEN Vict_Descent = 'B' THEN 'Black'
                 WHEN Vict_Descent = 'H' THEN 'Hispanic'
                 WHEN Vict_Descent = 'I' THEN 'nativeAmerican'
                 WHEN Vict_Descent = 'W' THEN 'White'
                 ELSE 'Other'
               END
      ORDER BY month, descent_group`,
      { lat_min, lat_max, lon_min, lon_max, year }
    );

    const rawData = result.rows;

    // Initialize array with default values for all months
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dataByMonth = months.map((month) => ({
      month,
      black: 0,
      asian: 0,
      hispanic: 0,
      white: 0,
      nativeAmerican: 0,
      other: 0,
    }));

    // Process the raw data
    rawData.forEach(([month, Vict_Descent, count]) => {
      const monthIndex = parseInt(month, 10) - 1; // Convert '01' -> index 0
      if (monthIndex >= 0 && monthIndex < 12) {
        if (Vict_Descent === 'Black') {
          dataByMonth[monthIndex].black += count;
        } else if (Vict_Descent === 'Asian') {
          dataByMonth[monthIndex].asian += count;
        } else if (Vict_Descent === 'Hispanic') {
          dataByMonth[monthIndex].hispanic += count;
        } else if (Vict_Descent === 'White') {
          dataByMonth[monthIndex].white += count;
        } else if (Vict_Descent === 'nativeAmerican') {
          dataByMonth[monthIndex].nativeAmerican += count;
        } else if (Vict_Descent === 'Other') {
          dataByMonth[monthIndex].other += count;
        }
      }
    });

    // Send the query result as JSON
    res.json({
      message: 'Victim descent data fetched successfully!',
      data: dataByMonth,
    });
  } catch (error) {
    console.error('Error fetching victim data:', error);
    res.status(500).json({
      message: 'Failed to fetch victim data',
      error: error.message,
    });
  }
});

// Fetch weapons at {LAT} and {LON} in the year {YEAR}
router.get('/byWeapon', async (req, res) => {
  const { lat, lon, year } = req.query; // Extract latitude, longitude, and year from query parameters

  // Validate inputs
  if (!lat || !lon || !year) {
    return res.status(400).json({ message: 'Latitude, longitude, and year are required' });
  }

  try {
    const { lat_min, lat_max, lon_min, lon_max } = LatLonRange(Number(lat), Number(lon));

    const result = await executeQuery(
      `SELECT 
        TO_CHAR(ci.Date_Rptd, 'MM') AS month,
        COUNT(CASE WHEN w.Weapon_Used_Cd IS NOT NULL THEN ci.DR_NO END) AS weapons_count,
        COUNT(CASE WHEN w.Weapon_Used_Cd IS NULL THEN ci.DR_NO END) AS no_weapons_count
      FROM Incident_Weapon w
      JOIN CrimeIncident ci ON ci.DR_NO = w.DR_NO
      WHERE ci.LAT BETWEEN :lat_min AND :lat_max
        AND ci.LON BETWEEN :lon_min AND :lon_max
        AND TO_CHAR(ci.Date_Rptd, 'YYYY') = :year
      GROUP BY TO_CHAR(ci.Date_Rptd, 'MM')
      ORDER BY TO_CHAR(ci.Date_Rptd, 'MM')`,
      { lat_min, lat_max, lon_min, lon_max, year }
    );

    // Process the raw data
    const rawData = result.rows;

    // Initialize array with default values for all months
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dataByMonth = months.map((month) => ({
      month,
      weapon: 0,
      noWeapon: 0,
    }));

    rawData.forEach(([month, weapons_count, no_weapons_count]) => {
      const monthIndex = parseInt(month, 10) - 1; // Convert '01' -> index 0
      if (monthIndex >= 0 && monthIndex < 12) {
        dataByMonth[monthIndex].weapon += weapons_count;
        dataByMonth[monthIndex].noWeapon += no_weapons_count;
      }
    });

    // Send the query result as JSON
    res.json({
      data: dataByMonth, // Array of rows, each containing 'month', 'weapons_count', and 'no_weapons_count'
    });
  } catch (error) {
    console.error('Error fetching weapon data:', error);
    res.status(500).json({
      message: 'Failed to fetch weapon data',
      error: error.message,
    });
  }
});

// Fetch DR_NO at {LAT} and {LON} in the year {YEAR}
router.get('/crimeList', async (req, res) => {
  const { lat, lon, year } = req.query; // Extract latitude, longitude, and year from query parameters

  // Validate inputs
  if (!lat || !lon || !year) {
    return res.status(400).json({ message: 'Latitude, longitude, and year are required' });
  }

  try {
    const { lat_min, lat_max, lon_min, lon_max } = LatLonRange(Number(lat), Number(lon));

    const result = await executeQuery(
      `SELECT 
        DR_NO
      FROM CrimeIncident
      WHERE LAT BETWEEN :lat_min AND :lat_max
        AND LON BETWEEN :lon_min AND :lon_max
        AND TO_CHAR(Date_Rptd, 'YYYY') = :year
      FETCH FIRST 50 ROWS ONLY`,
      { lat_min, lat_max, lon_min, lon_max, year }
    );

    let finalResult = [];
    for (const row of result.rows) {
      finalResult.push(row[0]);
    }

    // Send the query result as JSON
    res.json({
      data: finalResult,
    });

  } catch (error) {
    console.error('Error fetching crime report data:', error);
    res.status(500).json({
      message: 'Failed to fetch crime report data',
      error: error.message,
    });
  }
});

// Fetch all details from {caseId}
router.get('/crimeDetail', async (req, res) => {
  const { caseId } = req.query; // caseId from query parameters

  // Validate inputs
  if (!caseId) {
    return res.status(400).json({ message: 'Case ID required' });
  }

  try {
    const result = await executeQuery(
      `SELECT 
        ci.DR_NO AS caseId,
        ci.DATE_OCC AS happenedDate,
        ci.TIME_OCC AS happenedTime,
        v.Vict_Sex AS gender,
        v.Vict_Age AS age,
        v.Vict_Descent AS nation,
        ci.LAT AS happenedLat,
        ci.LON AS happenedLon,
        w.Weapon_Used_Cd AS weaponCode
      FROM CrimeIncident ci
      JOIN Victim v ON v.DR_NO = ci.DR_NO
      JOIN Incident_Weapon w ON w.DR_NO = ci.DR_NO
      WHERE ci.DR_NO = :caseId`,
      { caseId }
    );
    
    // Process raw data
    const rawData = result.rows;
    const dataByCrime = [];

    rawData.forEach(row => {
      const [caseId, happenedDate, happenedTime, gender, age, nation, happenedLat, happenedLon, weaponCode] = row;
      
      // Enter full values
      const genderValue = 
        gender === 'F' ? 'Female' : 
        gender === 'M' ? 'Male' : 
        'Other';
      const nationValue = 
        nation === 'B' ? 'Black' :
        nation === 'H' ? 'Hispanic/Latin/Mexican' :
        nation === 'I' ? 'American Indian/Alaskan Native' :
        nation === 'W' ? 'White' :
        nation === 'A' || 'C' || 'D' || 'F' || 'G' || 'J' || 'K' || 'L' || 'P' || 'S' || 'U' || 'V' || 'Z' ? 'Asian/Pacific Islander' :
        'Other';
      const timeValue = happenedTime.slice(0, 2) + ":" + happenedTime.slice(2);
      
      dataByCrime.push({
        caseId,
        happenedDate,
        happenedTime: timeValue,
        gender: genderValue,
        age,
        nation: nationValue,
        happenedLat,
        happenedLon,
        weaponCode,
      });
    });

    // Send the query result as JSON
    res.json({
      data: dataByCrime,
    });

  } catch (error) {
    console.error('Error fetching crime detail data:', error);
    res.status(500).json({
      message: 'Failed to fetch crime detail data',
      error: error.message,
    });
  }
});

router.get("/heatmap", async (req, res) => {
  const locations = LAlocations; // Expect an array of locations with lat, lon properties
  console.log('first')
  if (!Array.isArray(locations)) {
    return res
      .status(400)
      .json({ message: "Invalid data format. Array of locations required." });
  }

  try {
    // Process each location
    const updatedLocations = await Promise.all(
      locations.map(async (location) => {
        const { lat, lon } = location;

        // Calculate latitude and longitude range for a 5-mile radius
        const { lat_min, lat_max, lon_min, lon_max } = LatLonRange(
          Number(lat),
          Number(lon),
          5
        );

        // Query to count crime cases within the range
        const result = await executeQuery(
          `SELECT COUNT(*) AS case_count
           FROM CrimeIncident
           WHERE LAT BETWEEN :lat_min AND :lat_max
             AND LON BETWEEN :lon_min AND :lon_max`,
          { lat_min, lat_max, lon_min, lon_max }
        );

        const averageCases = result.rows[0]?.CASE_COUNT || 0;

        // Add the calculated average to the 'mag' field
        return {
          ...location,
          properties: { ...location.properties, mag: averageCases },
        };
      })
    );

    // Respond with updated locations
    res.json({
      message: "Average cases calculated successfully!",
      data: updatedLocations,
    });
  } catch (error) {
    console.error("Error calculating average cases:", error);
    res.status(500).json({
      message: "Failed to calculate average cases",
      error: error.message,
    });
  }
});

module.exports = router;