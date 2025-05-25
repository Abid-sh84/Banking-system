// Simple script to test the API endpoints
const axios = require('axios');

// Define the API base URL
const baseURL = 'http://localhost:5000';

// Test URLs to check
const urlsToTest = [
  '/api/auth/login/customer',
  '/auth/login/customer',
  '/api/auth/login/banker',
  '/auth/login/banker',
  '/api/auth/register',
  '/auth/register',
  '/health'
];

// Test data for login
const testData = {
  email: 'customer@example.com',
  password: 'customer123'
};

// Run tests
async function testEndpoints() {
  console.log('Testing API endpoints...');
  
  for (const url of urlsToTest) {
    try {
      console.log(`\nTesting GET ${url}`);
      const response = await axios.get(`${baseURL}${url}`);
      console.log(`Status: ${response.status}`);
      console.log('Response:', response.data);
    } catch (error) {
      console.error(`GET ${url} failed:`, error.message);
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      }
    }
  }
  
  console.log('\n\nTesting customer login...');
  
  try {
    const response = await axios.post(`${baseURL}/api/auth/login/customer`, testData, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('Login response:', response.data);
  } catch (error) {
    console.error('Login failed:', error.message);
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    }
  }
}

testEndpoints();
