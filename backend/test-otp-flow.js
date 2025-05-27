// Test script for the OTP registration flow
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
const CUSTOMER_EMAIL = `test_user_${Math.floor(Math.random() * 10000)}@example.com`;
const TEST_PASSWORD = 'Test123456';

async function testOTPRegistrationFlow() {
  console.log('=== Testing OTP Registration Flow ===');
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
    
    if (registerResponse.data.success) {
      console.log('✅ Registration successful, OTP sent');
      
      // Step 2: Check the registration_otp table in the database (manual step)
      console.log('\n2. Please check the database for the OTP');
      console.log('Run this SQL query in your PostgreSQL: SELECT * FROM registration_otp WHERE email = \'' + CUSTOMER_EMAIL + '\'');
      console.log('Note the OTP value and proceed with testing the verification endpoint');
      
      // In a real-world scenario, we would extract the OTP from the email or DB directly
      // But for demonstration purposes, we'll prompt the user to provide the OTP manually
      console.log('\n3. Use the OTP to verify the registration');
      console.log(`For manual testing, make this request:`);
      console.log(`POST ${API_URL}/auth/verify-otp`);
      console.log(`Body: { "email": "${CUSTOMER_EMAIL}", "otp": "<OTP_VALUE>" }`);
      
      console.log('\n4. Test resend OTP functionality');
      console.log(`POST ${API_URL}/auth/resend-otp`);
      console.log(`Body: { "email": "${CUSTOMER_EMAIL}" }`);
      
      console.log('\n5. Test OTP expiration (wait 15+ minutes and try to verify)');
      
      console.log('\n6. Test invalid OTP handling (use an incorrect OTP)');
      
      console.log('\nNote: Full automation of this test would require access to the email system or database to retrieve the OTP automatically');
    } else {
      console.error('❌ Registration failed');
    }
  } catch (error) {
    console.error('Error during registration test:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status code:', error.response.status);
    }
  }
}

// Run the test
testOTPRegistrationFlow();
