const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables with absolute path
const envPath = path.resolve('c:\\Users\\Shamim shaikh\\Desktop\\Assignment\\project\\backend\\.env');
console.log('DB config loading .env from:', envPath);
console.log('File exists:', fs.existsSync(envPath));
dotenv.config({ path: envPath });

// Get database config from environment variables
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000 // Close idle clients after 30 seconds
};

// Create connection pool with environment variables
const pool = new Pool(dbConfig);

// Test the connection
async function testConnection() {  try {
    const client = await pool.connect();
    console.log('PostgreSQL database connection successful');
    client.release();
    return true;  } catch (error) {
    console.error('PostgreSQL database connection failed:', error);
    throw error; // Throw the error but don't exit process
  }
}

// Helper function to execute queries with parameters
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query', { text, error });
    throw error;
  }
};

// Export the pool, query helper and the test function
module.exports = {
  pool,
  query,
  testConnection
};
