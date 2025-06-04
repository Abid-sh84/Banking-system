/**
 * Debug Authentication Module
 * 
 * This module provides utility functions for debugging authentication issues
 * NOTE: This file should NOT be included in production builds
 */

import axios from 'axios';

// Define the API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Test banker login functionality to diagnose issues
 * @param {string} email - Banker's email
 * @param {string} password - Banker's password
 * @returns {Promise<Object>} Diagnostic information
 */
export async function testBankerLogin(email, password) {
  console.log('Debug Auth: Testing banker login with email:', email);
  
  try {
    // Test network connectivity
    const networkTest = await testNetworkConnectivity();
    
    // Test direct API call
    const endpoint = `${API_BASE_URL}/api/auth/banker/login`;
    console.log('Debug Auth: Making direct API call to:', endpoint);
    
    // Attempt the API call but catch any errors for diagnostic purposes
    let apiResponse;
    let apiError = null;
    
    try {
      const response = await axios.post(endpoint, { email, password });
      apiResponse = {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      };
    } catch (error) {
      apiError = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      };
    }
    
    // Return diagnostic information
    return {
      timestamp: new Date().toISOString(),
      networkConnectivity: networkTest,
      apiEndpoint: endpoint,
      credentials: {
        email,
        password: password ? '********' : 'empty' // Don't log actual password
      },
      apiResponse: apiResponse || null,
      apiError: apiError || null
    };
  } catch (error) {
    return {
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack
    };
  }
}

/**
 * Test basic network connectivity to API
 * @returns {Promise<Object>} Network connectivity status
 */
async function testNetworkConnectivity() {  try {
    const startTime = performance.now();
    await axios.get(`${API_BASE_URL}/api/test/health-check`, { timeout: 5000 })
      .catch(() => axios.get(`${API_BASE_URL}/health`, { timeout: 5000 })
        .catch(() => {})); // Try both health check endpoints
    const endTime = performance.now();
    
    return {
      success: true,
      latency: Math.round(endTime - startTime),
      apiBaseUrl: API_BASE_URL
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      apiBaseUrl: API_BASE_URL
    };
  }
}
