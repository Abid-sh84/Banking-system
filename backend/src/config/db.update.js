// Script to update database schema
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables with absolute path
const envPath = path.resolve('c:\\Users\\Shamim shaikh\\Desktop\\Assignment\\project\\backend\\.env');
console.log('DB update loading .env from:', envPath);
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
  }
} catch (err) {
  console.error('Error manually loading .env file:', err);
}

// Also try dotenv as backup
dotenv.config({ path: envPath });

async function updateDatabase() {
  const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
  } = process.env;
  try {
    // Create connection with fallback values
    const pool = new Pool({
      host: DB_HOST || 'localhost',
      user: DB_USER || 'postgres',
      password: DB_PASSWORD || 'abid7062',
      database: DB_NAME || 'bank',
      port: parseInt(DB_PORT, 10) || 5432
    });

    console.log('Connected to database. Checking for schema updates...');
    
    // Check if customer_id column exists
    const columns = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns      WHERE TABLE_SCHEMA = $1 AND TABLE_NAME = 'customers' AND COLUMN_NAME = 'customer_id'
    `, [DB_NAME]);

    // If customer_id column doesn't exist, add it
    if (columns.rows.length === 0) {
      console.log('Adding customer_id column to customers table...');
      
      // First add the column
      await pool.query(`
        ALTER TABLE customers 
        ADD COLUMN customer_id VARCHAR(15)
      `);
      
      // Generate and set customer_id for existing customers
      const customers = await pool.query('SELECT id FROM customers');
      
      for (const customer of customers.rows) {
        const customerId = 'CUST' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
        await pool.query(
          'UPDATE customers SET customer_id = $1 WHERE id = $2',
          [customerId, customer.id]
        );
      }
        // Now add the NOT NULL and UNIQUE constraints
      await pool.query(`
        ALTER TABLE customers 
        ALTER COLUMN customer_id SET NOT NULL,
        ADD CONSTRAINT customer_id_unique UNIQUE (customer_id)
      `);
      
      console.log(`Added customer_id to ${customers.rows.length} existing customers`);
    } else {
      console.log('customer_id column already exists');
    }

    console.log('Database update completed successfully');
    await pool.end();
    
    return { success: true, message: 'Database updated successfully' };
  } catch (error) {
    console.error('Error updating database:', error);
    return { success: false, error: error.message };
  }
}

// Run the update if this file is executed directly
if (require.main === module) {
  updateDatabase();
}

module.exports = updateDatabase;