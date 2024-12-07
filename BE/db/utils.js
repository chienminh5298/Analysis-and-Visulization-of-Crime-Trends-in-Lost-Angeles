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

// updated LatLonRange function to dynamically handle the 5-mile radius

/**
 * Convert miles to latitude and longitude offsets.
 * @param {number} radius - Radius in miles.
 * @returns {Object} - Offsets for latitude and longitude.
 */
function getOffsets(radius) {
  const latOffset = (radius / 69) * 0.5; // 1 lat = 69 mi, halved for offset
  const lonOffset = (radius / 57.31) * 0.5; // 1 lon = 57.31 mi @ lat ~34.055, halved for offset
  return { latOffset, lonOffset };
}

/**
 * Calculate latitude and longitude range for a given center point and radius.
 * @param {number} lat - The central latitude.
 * @param {number} lon - The central longitude.
 * @param {number} radius - Radius in miles.
 * @returns {Object} - An object containing min/max values for latitude and longitude.
 */
function LatLonRange(lat, lon, radius = 50) {
  const { latOffset, lonOffset } = getOffsets(radius);
  return {
    lat_min: lat - latOffset,
    lat_max: lat + latOffset,
    lon_min: lon - lonOffset,
    lon_max: lon + lonOffset,
  };
}

module.exports = { executeQuery, LatLonRange };