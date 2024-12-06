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

module.exports = executeQuery;