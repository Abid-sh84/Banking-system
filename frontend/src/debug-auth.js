// Debug file to test auth endpoints directly
import axios from 'axios';

// Direct API calls without going through the interceptor
// Create two API instances - one for direct backend calls and one for Vite proxy
const directTestApi = axios.create({
  baseURL: 'http://localhost:5000', // Your backend server direct
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 5000, // 5 second timeout
});

const proxyTestApi = axios.create({
  baseURL: '', // Local relative path, will use Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 5000, // 5 second timeout
});

// Test function for banker login
export const testBankerLogin = async (email, password) => {
  try {
    console.log('Testing banker login with:', { email });
    
    // Try multiple paths for banker login
    const testPaths = [
      {api: directTestApi, path: '/auth/login/banker', type: 'direct'},
      {api: directTestApi, path: '/auth/login-banker', type: 'direct'},
      {api: directTestApi, path: '/api/auth/login/banker', type: 'direct'},
      {api: directTestApi, path: '/api/auth/login-banker', type: 'direct'},
      {api: proxyTestApi, path: '/auth/login/banker', type: 'proxy'},
      {api: proxyTestApi, path: '/auth/login-banker', type: 'proxy'},
      {api: proxyTestApi, path: '/api/auth/login/banker', type: 'proxy'},
      {api: proxyTestApi, path: '/api/auth/login-banker', type: 'proxy'}
    ];
    
    let successResponse = null;
    let errors = [];
    
    for (const {api, path, type} of testPaths) {
      try {
        console.log(`Trying ${type} path: ${path}`);
        const response = await api.post(path, { email, password });
        console.log(`Success with ${type} ${path}:`, response.status);
        successResponse = { path, type, response };
        break; // Stop if successful
      } catch (error) {
        const errorInfo = {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        };
        console.error(`Failed with ${type} ${path}:`, errorInfo);
        errors.push({ path, type, error: errorInfo });
      }
    }
    
    return { 
      success: !!successResponse, 
      path: successResponse?.path,
      type: successResponse?.type,
      response: successResponse?.response, 
      errors 
    };
  } catch (error) {
    console.error('Test failed completely:', error);
    return { success: false, error: error.message };
  }
};

// Test function for customer login
export const testCustomerLogin = async (email, password) => {
  try {
    console.log('Testing customer login with:', { email });
    
    // Try multiple paths for customer login
    const testPaths = [
      {api: directTestApi, path: '/auth/login/customer', type: 'direct'},
      {api: directTestApi, path: '/auth/login-customer', type: 'direct'},
      {api: directTestApi, path: '/api/auth/login/customer', type: 'direct'},
      {api: directTestApi, path: '/api/auth/login-customer', type: 'direct'},
      {api: proxyTestApi, path: '/auth/login/customer', type: 'proxy'},
      {api: proxyTestApi, path: '/auth/login-customer', type: 'proxy'},
      {api: proxyTestApi, path: '/api/auth/login/customer', type: 'proxy'},
      {api: proxyTestApi, path: '/api/auth/login-customer', type: 'proxy'}
    ];
    
    let successResponse = null;
    let errors = [];
    
    for (const {api, path, type} of testPaths) {
      try {
        console.log(`Trying ${type} path: ${path}`);
        const response = await api.post(path, { email, password });
        console.log(`Success with ${type} ${path}:`, response.status);
        successResponse = { path, type, response };
        break; // Stop if successful
      } catch (error) {
        const errorInfo = {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        };
        console.error(`Failed with ${type} ${path}:`, errorInfo);
        errors.push({ path, type, error: errorInfo });
      }
    }
    
    return { 
      success: !!successResponse, 
      path: successResponse?.path,
      type: successResponse?.type, 
      response: successResponse?.response, 
      errors 
    };
  } catch (error) {
    console.error('Test failed completely:', error);
    return { success: false, error: error.message };
  }
};
