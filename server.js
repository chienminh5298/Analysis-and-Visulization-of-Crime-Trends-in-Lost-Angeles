const express = require('express'); 
const oracledb = require('oracledb'); 
require('dotenv').config(); 

const app = express(); 
const PORT = process.env.PORT || 5000; 

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
  }
}


app.get('/api/test-connection', async (req, res) => {
  let connection;
  try {
    
    connection = await connectToDB();
    
    const result = await connection.execute('SELECT 1 FROM DUAL');
    res.json({
      message: 'Database connection successful!',
      data: result.rows,
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  } finally {

    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});