const connectToDB = require('./oracle'); // Adjust the path to your connection logic

async function executeQuery(query, params = []) {
  let connection;
  try {
    // Connect to the database
    connection = await connectToDB();

    // Execute the provided query with parameters
    const result = await connection.execute(query, params);

    return result; // Return the query result
  } catch (error) {
    console.error('Error executing query:', error);
    throw error; // Re-throw the error for the calling code to handle
  } finally {
    // Ensure the connection is always closed
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
}

/**
 * Calculate latitude and longitude range for a given center point and offset.
 * @param {number} lat - The central latitude.
 * @param {number} lon - The central longitude.
 * @param {number} latOffset - The range offset for latitude.
 * @param {number} lonOffset - The range offset for longitude.
 * @returns {Object} - An object containing min/max values for latitude and longitude.
 */
function LatLonRange(lat, lon, latOffset = 0.362, lonOffset = 0.458) {
  return {
    lat_min: lat - latOffset,
    lat_max: lat + latOffset,
    lon_min: lon - lonOffset,
    lon_max: lon + lonOffset,
  };
}

module.exports = { executeQuery, LatLonRange };