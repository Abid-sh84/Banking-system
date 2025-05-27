// End-to-end test for OTP registration flow
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
const CUSTOMER_EMAIL = `test_user_${Math.floor(Math.random() * 10000)}@example.com`;
const TEST_PASSWORD = 'Test123456';

async function getOTPFromDatabase(email) {
  const pool = new Pool(dbConfig);
  try {
    const result = await pool.query(
      'SELECT otp FROM registration_otp WHERE email = $1',
      [email]
    );
    
    await pool.end();
    
    if (result.rows.length > 0) {
      return result.rows[0].otp;
    } else {
      throw new Error('OTP not found for email: ' + email);
    }
  } catch (error) {
    console.error('Error retrieving OTP from database:', error.message);
    throw error;
  }
}

async function e2eTestOTPRegistration() {
  console.log('=== E2E Test: OTP Registration Flow ===');
  console.log(`Using test email: ${CUSTOMER_EMAIL}`);
  
  try {
    // Step 1: Submit registration form and get OTP
    console.log('\n1. Submitting registration form...');
    const registrationData = {
      name: 'Test User',
      email: CUSTOMER_EMAIL,
      password: TEST_PASSWORD,
      address: '123 Test Street, Test City',
      phone: '9876543210',
      accountType: 'savings'
    };
    
    const registerResponse = await axios.post(`${API_URL}/auth/register`, registrationData);
    console.log('Registration response:', registerResponse.data);
    
    if (!registerResponse.data.success) {
      throw new Error('Registration failed');
    }
    
    console.log('✅ Registration successful, OTP sent');
    
    // Step 2: Get the OTP from database
    console.log('\n2. Retrieving OTP from database...');
    const otp = await getOTPFromDatabase(CUSTOMER_EMAIL);
    console.log(`Retrieved OTP: ${otp}`);
    
    // Step 3: Verify OTP
    console.log('\n3. Verifying OTP...');
    const verifyResponse = await axios.post(`${API_URL}/auth/verify-otp`, {
      email: CUSTOMER_EMAIL,
      otp: otp
    });
    
    console.log('Verification response:', verifyResponse.data);
    
    if (verifyResponse.data.success) {
      console.log('✅ OTP verification successful');
      console.log('✅ Customer account created successfully');
      
      // Step 4: Login with the new account
      console.log('\n4. Testing login with new account...');
      const loginResponse = await axios.post(`${API_URL}/auth/login/customer`, {
        email: CUSTOMER_EMAIL,
        password: TEST_PASSWORD
      });
      
      console.log('Login response:', loginResponse.data);
      
      if (loginResponse.data.success) {
        console.log('✅ Login successful');
        console.log('✅ E2E Test passed successfully!');
      } else {
        console.error('❌ Login failed');
      }
    } else {
      console.error('❌ OTP verification failed');
    }
  } catch (error) {
    console.error('Error during E2E test:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status code:', error.response.status);
    }
  }
}

// Run the E2E test
e2eTestOTPRegistration();
