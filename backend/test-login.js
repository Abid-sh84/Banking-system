const axios = require('axios');

// Configuration
const API_URL = 'http://localhost:5000';
const TEST_CUSTOMER = {
  email: 'customer@example.com', 
  password: 'customer123'  // This should match the password you set up in your db.init.js
};

// Test customer login
async function testCustomerLogin() {
  try {
    console.log('Testing customer login...');
    console.log('Sending request to:', `${API_URL}/api/auth/login/customer`);
    console.log('With data:', { email: TEST_CUSTOMER.email, password: '***' });
    
    const response = await axios.post(
      `${API_URL}/api/auth/login/customer`, 
      TEST_CUSTOMER,
      { 
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    console.log('Login successful!');
    console.log('Status:', response.status);
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Login failed!');
    console.error('Status:', error.response?.status);
    console.error('Error message:', error.message);
    
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
    
    if (error.request) {
      console.error('Request data:', error.request._header);
    }
  }
}

// Run the test
testCustomerLogin();
