// Database migration script for OTP verification
const { pool } = require('./db.config');

// Create the registration_otp table
const createOtpTable = async () => {
  try {
    const otpTableQuery = `
      CREATE TABLE IF NOT EXISTS registration_otp (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        otp VARCHAR(6) NOT NULL,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        account_type VARCHAR(50) DEFAULT 'savings',
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        attempted_count INTEGER DEFAULT 0
      );
    `;
    
    await pool.query(otpTableQuery);
    console.log('Registration OTP table created or already exists');
  } catch (error) {
    console.error('Error creating registration OTP table:', error);
    throw error;
  }
};

module.exports = {
  createOtpTable
};
