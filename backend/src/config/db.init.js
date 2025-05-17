const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');

// Load environment variables from parent directory
dotenv.config({ path: path.join(__dirname, '../../../.env') });

async function initializeDatabase() {
  const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
  } = process.env;

  try {
    // Create connection without database to check if it exists
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT
    });

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    console.log(`Database '${DB_NAME}' checked/created`);

    // Switch to our database
    await connection.query(`USE ${DB_NAME}`);

    // Create customers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        account_number VARCHAR(20) NOT NULL UNIQUE,
        balance DECIMAL(15, 2) DEFAULT 0.00,
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Customers table checked/created');

    // Create bankers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS bankers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('banker', 'admin') DEFAULT 'banker',
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Bankers table checked/created');

    // Create transactions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        amount DECIMAL(15, 2) NOT NULL,
        type ENUM('deposit', 'withdrawal', 'transfer', 'received') NOT NULL,
        description TEXT,
        sender_id INT,
        receiver_id INT,
        status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id),
        FOREIGN KEY (sender_id) REFERENCES customers(id),
        FOREIGN KEY (receiver_id) REFERENCES customers(id)
      )
    `);
    console.log('Transactions table checked/created');

    // Check if admin exists
    const [adminResult] = await connection.query(
      'SELECT * FROM bankers WHERE role = "admin"'
    );    // Create default admin if none exists
    if (adminResult.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.BANKER_PASSWORD , salt);

      await connection.query(
        'INSERT INTO bankers (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin User', 'admin@bank.com', hashedPassword, 'admin']
      );
      console.log('Default admin user created: admin@bank.com / ' + (process.env.BANKER_PASSWORD));
    }

    // Check if test customer exists
    const [customerResult] = await connection.query(
      'SELECT * FROM customers LIMIT 1'
    );

    // Create test customer if none exists
    if (customerResult.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('customer123', salt);
      const accountNumber = '1000000001';

      await connection.query(
        'INSERT INTO customers (name, email, password, address, phone, account_number, balance) VALUES (?, ?, ?, ?, ?, ?, ?)',
        ['Test Customer', 'customer@example.com', hashedPassword, '123 Test St', '1234567890', accountNumber, 1000.00]
      );
      console.log('Test customer created: customer@example.com / customer123');
    }

    console.log('Database initialization completed successfully');
    connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Run the initialization
initializeDatabase();
