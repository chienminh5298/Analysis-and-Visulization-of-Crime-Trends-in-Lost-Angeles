const oracledb = require('oracledb');
require('dotenv').config();

async function connectToDB() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectionString: process.env.DB_CONNECTION_STRING,
    });
    console.log('Connected to Oracle DB');
    return connection;
  } catch (err) {
    console.error('Error connecting to Oracle DB:', err);
    throw err;
  }
}

module.exports = connectToDB;