const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables directly with absolute path
const envPath = path.resolve(path.join(__dirname, '../../.env'));
console.log('DB config loading .env from:', envPath);
console.log('File exists:', fs.existsSync(envPath));

// Manual environment variable loading if dotenv doesn't work correctly
try {
  if (fs.existsSync(envPath)) {
    const envData = fs.readFileSync(envPath, 'utf8');
    const envLines = envData.split('\n');
    
    envLines.forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        process.env[key] = value;
      }
    });
    
    console.log('Manually loaded environment variables from .env file');
  }
} catch (err) {
  console.error('Error manually loading .env file:', err);
}

// Also try dotenv as backup
dotenv.config({ path: envPath });

// Print loaded configuration (without sensitive info)
console.log('Environment variables loaded. DB info:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  passwordSet: process.env.DB_PASSWORD ? 'yes' : 'no'
});

// Get database config from environment variables with hardcoded defaults as backup
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'abid7062', // Use the password from your .env file
  database: process.env.DB_NAME || 'bank',
  port: parseInt(process.env.DB_PORT, 10) || 5432, // Default PostgreSQL port
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000 // Close idle clients after 30 seconds
};

// Create connection pool with environment variables
// Create a clean config object with only valid properties
const cleanConfig = {
  host: dbConfig.host,
  user: dbConfig.user,
  password: typeof dbConfig.password === 'string' ? dbConfig.password : '',
  database: dbConfig.database,
  port: parseInt(dbConfig.port, 10) || 5432,
  max: dbConfig.max,
  idleTimeoutMillis: dbConfig.idleTimeoutMillis
};

// Log the clean config (without password)
console.log('Creating DB pool with config:', {
  ...cleanConfig,
  password: '***hidden***'
});

// Create pool with clean config
const pool = new Pool(cleanConfig);

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
