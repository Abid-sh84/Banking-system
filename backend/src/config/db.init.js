const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { initializeDepositsTable } = require('./db.deposits');

// Load environment variables with absolute path
const envPath = path.resolve('c:\\Users\\Shamim shaikh\\Desktop\\Assignment\\project\\backend\\.env');
console.log('Loading .env from:', envPath);
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

async function initializeDatabase() {
  const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
  } = process.env;
  
  console.log('Database Configuration:', {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD ? '******' : undefined,
    database: DB_NAME,
    port: DB_PORT
  });  try {
    // Create connection without database to check if it exists
    const client = new Client({
      host: DB_HOST || 'localhost',
      user: DB_USER || 'postgres',
      password: DB_PASSWORD,
      port: parseInt(DB_PORT, 10) || 5432,
      database: 'postgres' // Connect to default database first
    });

    await client.connect();

    // Check if database exists
    const dbCheckResult = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [DB_NAME]
    );

    // Create database if not exists
    if (dbCheckResult.rows.length === 0) {
      await client.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database '${DB_NAME}' created`);
    } else {
      console.log(`Database '${DB_NAME}' already exists`);
    }    await client.end();
      // Connect to the specific database
    const pool = new Pool({
      host: DB_HOST || 'localhost',
      user: DB_USER || 'postgres',
      password: DB_PASSWORD,
      database: DB_NAME || 'bank',
      port: parseInt(DB_PORT, 10) || 5432
    });
    
    // Create customers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        customer_id VARCHAR(15) UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        account_number VARCHAR(20) NOT NULL UNIQUE,
        balance DECIMAL(15, 2) DEFAULT 0.00,
        status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'suspended')) DEFAULT 'active',
        account_type VARCHAR(20) CHECK (account_type IN ('savings', 'current', 'fixed')) DEFAULT 'savings',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Customers table checked/created');    // Create bankers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bankers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) CHECK (role IN ('banker', 'admin')) DEFAULT 'banker',
        status VARCHAR(20) CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Bankers table checked/created');

    // Create transactions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL,
        amount DECIMAL(15, 2) NOT NULL,
        type VARCHAR(20) CHECK (type IN ('deposit', 'withdrawal', 'transfer', 'received')) NOT NULL,
        description TEXT,
        sender_id INT,
        receiver_id INT,
        status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id),
        FOREIGN KEY (sender_id) REFERENCES customers(id),
        FOREIGN KEY (receiver_id) REFERENCES customers(id)
      )
    `);    console.log('Transactions table checked/created');
    
    // Create virtual_cards table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS virtual_cards (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        card_number VARCHAR(16) NOT NULL,
        cardholder_name VARCHAR(100) NOT NULL,
        expiry_date VARCHAR(5) NOT NULL,
        cvv VARCHAR(3) NOT NULL,
        status VARCHAR(20) CHECK (status IN ('active', 'inactive', 'blocked')) DEFAULT 'inactive',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        CONSTRAINT unique_customer_card UNIQUE (customer_id)
      )
    `);
    console.log('Virtual Cards table checked/created');
    
    // Check if admin exists
    const adminResult = await pool.query(
      "SELECT * FROM bankers WHERE role = 'admin'"
    );
      // Create default admin if none exists
    if (adminResult.rows.length === 0) {
      // Use the plain password from .env directly as you mentioned you've manually set it in the database
      const bankerPassword = process.env.BANKER_PASSWORD;
      
      await pool.query(
        'INSERT INTO bankers (name, email, password, role) VALUES ($1, $2, $3, $4)',
        ['Admin User', 'admin@bank.com', bankerPassword, 'admin']
      );
      console.log(`Default admin user created: admin@bank.com with direct password`);
    } 
    // Update existing admin password if it exists but needs to be changed
    else {
      // Update the admin user with the direct password from .env
      const bankerPassword = process.env.BANKER_PASSWORD;
      
      await pool.query(
        "UPDATE bankers SET password = $1 WHERE role = 'admin'",
        [bankerPassword]
      );
      console.log('Admin password updated to match .env BANKER_PASSWORD');
    }
    
    // Check if test customer exists
    const customerResult = await pool.query(
      'SELECT * FROM customers LIMIT 1'
    );
    
    // Create test customer if none exists
    if (customerResult.rows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('customer123', salt);
      const accountNumber = '1000000001';
      const customerId = 'CUST1000000001';

      await pool.query(
        'INSERT INTO customers (name, email, password, address, phone, account_number, customer_id, balance, account_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        ['Test Customer', 'customer@example.com', hashedPassword, '123 Test St', '1234567890', accountNumber, customerId, 1000.00, 'savings']
      );
      console.log('Test customer created: customer@example.com / customer123');
    }    // Initialize deposits table
    await initializeDepositsTable();
    
    console.log('Database initialization completed successfully');
    await pool.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeDatabase();
