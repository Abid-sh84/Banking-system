// Test script for OTP verification edge cases
const axios = require('axios');
const { Pool } = require('pg');

// Load environment variables (if .env file is used)
try {
  require('dotenv').config();
} catch (error) {
  console.log('No dotenv found, using system environment variables');
}

// Database config from environment variables or defaults
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'bank',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
};

// API URL
const API_URL = 'http://localhost:5000/api';
const CUSTOMER_EMAIL = `edge_case_${Math.floor(Math.random() * 10000)}@example.com`;
const TEST_PASSWORD = 'Test123456';

async function getOTPFromDatabase(email) {
  const pool = new Pool(dbConfig);
  try {
    const result = await pool.query(
      'SELECT otp FROM registration_otp WHERE email = $1',
      [email]
    );
    
    if (result.rows.length > 0) {
      return result.rows[0].otp;
    } else {
      throw new Error('OTP not found for email: ' + email);
    }
    
  } catch (error) {
    console.error('Error retrieving OTP from database:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

async function updateOTPExpiry(email, minutesAgo) {
  const pool = new Pool(dbConfig);
  try {
    // Set expiry to X minutes in the past
    const expiryTime = new Date(Date.now() - (minutesAgo * 60 * 1000));
    
    await pool.query(
      'UPDATE registration_otp SET expires_at = $1 WHERE email = $2',
      [expiryTime, email]
    );
    
    console.log(`Updated OTP expiry for ${email} to ${minutesAgo} minutes ago`);
    return true;
  } catch (error) {
    console.error('Error updating OTP expiry:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

async function updateOTPAttempts(email, attempts) {
  const pool = new Pool(dbConfig);
  try {
    await pool.query(
      'UPDATE registration_otp SET attempted_count = $1 WHERE email = $2',
      [attempts, email]
    );
    
    console.log(`Updated OTP attempts for ${email} to ${attempts}`);
    return true;
  } catch (error) {
    console.error('Error updating OTP attempts:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

async function testOTPEdgeCases() {
  console.log('=== Testing OTP Verification Edge Cases ===');
  console.log(`Using test email: ${CUSTOMER_EMAIL}`);
  
  try {
    // Step 1: Register a new user
    console.log('\n1. Creating a test registration...');
    const registrationData = {
      name: 'Edge Case User',
      email: CUSTOMER_EMAIL,
      password: TEST_PASSWORD,
      address: '123 Edge Case Street',
      phone: '9876543210',
      accountType: 'savings'
    };
    
    await axios.post(`${API_URL}/auth/register`, registrationData);
    const otp = await getOTPFromDatabase(CUSTOMER_EMAIL);
    console.log(`Retrieved OTP: ${otp}`);
    
    // Test Case 1: Invalid OTP
    console.log('\n--- Test Case 1: Invalid OTP ---');
    try {
      const invalidOTP = '000000'; // Different from the actual OTP
      await axios.post(`${API_URL}/auth/verify-otp`, {
        email: CUSTOMER_EMAIL,
        otp: invalidOTP
      });
      console.log('❌ Test Failed: Invalid OTP was accepted');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Test Passed: Invalid OTP was rejected');
        console.log('Error message:', error.response.data.message);
      } else {
        console.error('❌ Unexpected error:', error.message);
      }
    }
    
    // Test Case 2: Expired OTP
    console.log('\n--- Test Case 2: Expired OTP ---');
    await updateOTPExpiry(CUSTOMER_EMAIL, 20); // Set OTP to expire 20 minutes ago
    
    try {
      await axios.post(`${API_URL}/auth/verify-otp`, {
        email: CUSTOMER_EMAIL,
        otp: otp
      });
      console.log('❌ Test Failed: Expired OTP was accepted');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Test Passed: Expired OTP was rejected');
        console.log('Error message:', error.response.data.message);
      } else {
        console.error('❌ Unexpected error:', error.message);
      }
    }
    
    // Test Case 3: Reset expiry with resend OTP
    console.log('\n--- Test Case 3: Resend OTP ---');
    await axios.post(`${API_URL}/auth/resend-otp`, {
      email: CUSTOMER_EMAIL
    });
    
    const newOtp = await getOTPFromDatabase(CUSTOMER_EMAIL);
    console.log(`New OTP after resend: ${newOtp}`);
    
    // Verify the new OTP works
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email: CUSTOMER_EMAIL,
        otp: newOtp
      });
      
      if (response.data.success) {
        console.log('✅ Test Passed: Resent OTP verified successfully');
      } else {
        console.log('❌ Test Failed: Resent OTP verification failed');
      }
    } catch (error) {
      console.error('❌ Error during resent OTP verification:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
    
    console.log('\n=== Edge Case Testing Complete ===');
    
  } catch (error) {
    console.error('Error during edge case testing:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status code:', error.response.status);
    }
  }
}

// Run the tests
testOTPEdgeCases();
