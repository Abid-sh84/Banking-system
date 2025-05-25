// Backend connection test utility
import axios from 'axios';

// Simple utility to test backend connectivity 
const testBackendConnection = async () => {
  console.log('Testing backend connectivity...');
  
  // Get current origin for relative URLs
  const origin = window.location.origin;
    const endpoints = [
    // Only use relative URLs that work through the Vite proxy
    `${origin}/api/health`,
    `${origin}/api/auth/health`, 
    `${origin}/auth/health`,
    `${origin}/api/auth/login/banker`,
    `${origin}/api/auth/login/customer`,
    `${origin}/auth/login/banker`,
    `${origin}/auth/login/customer`
  ];
  
  const results = {};
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing endpoint: ${endpoint}`);
      // Only do a OPTIONS or HEAD request to check availability
      const response = await axios.head(endpoint, {
        timeout: 3000, // 3 second timeout
        validateStatus: () => true // Accept any status code
      });
      
      results[endpoint] = {
        status: response.status,
        headers: response.headers,
        ok: response.status < 400
      };
      
    } catch (error) {
      results[endpoint] = {
        error: error.message,
        ok: false
      };
      console.error(`Error connecting to ${endpoint}:`, error.message);
    }
  }
  
  console.log('Backend connectivity test results:', results);
  return results;
};

// Function to add backend connection test button to UI in development
export const addBackendConnectionTest = () => {
  // Only in development
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  
  const button = document.createElement('button');
  button.innerText = 'Test Backend Connection';
  button.style.position = 'fixed';
  button.style.bottom = '10px';
  button.style.right = '10px';
  button.style.zIndex = '9999';
  button.style.padding = '5px 10px';
  button.style.backgroundColor = '#4f46e5';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';
  button.style.fontSize = '12px';
  
  button.addEventListener('click', async () => {
    button.disabled = true;
    button.innerText = 'Testing...';
    
    try {
      const results = await testBackendConnection();
      console.log('Test completed:', results);
      
      // Show results in a small modal
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '50%';
      modal.style.left = '50%';
      modal.style.transform = 'translate(-50%, -50%)';
      modal.style.backgroundColor = 'white';
      modal.style.padding = '20px';
      modal.style.borderRadius = '8px';
      modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      modal.style.zIndex = '10000';
      modal.style.maxWidth = '500px';
      modal.style.maxHeight = '80vh';
      modal.style.overflow = 'auto';
      
      let html = '<h3>Backend Connection Test Results</h3>';
      
      for (const [endpoint, result] of Object.entries(results)) {
        const color = result.ok ? 'green' : 'red';
        html += `<p><strong>${endpoint}</strong>: <span style="color:${color}">${result.ok ? 'OK' : 'Failed'}</span></p>`;
        if (result.status) {
          html += `<p>Status: ${result.status}</p>`;
        }
        if (result.error) {
          html += `<p>Error: ${result.error}</p>`;
        }
        html += '<hr>';
      }
      
      const closeBtn = document.createElement('button');
      closeBtn.innerText = 'Close';
      closeBtn.style.padding = '5px 10px';
      closeBtn.style.backgroundColor = '#4f46e5';
      closeBtn.style.color = 'white';
      closeBtn.style.border = 'none';
      closeBtn.style.borderRadius = '4px';
      closeBtn.style.cursor = 'pointer';
      
      modal.innerHTML = html;
      modal.appendChild(closeBtn);
      document.body.appendChild(modal);
      
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    } catch (error) {
      console.error('Test failed:', error);
      alert('Connection test failed: ' + error.message);
    } finally {
      button.disabled = false;
      button.innerText = 'Test Backend Connection';
    }
  });
  
  document.body.appendChild(button);
};

// Function to check if backend server is running
export const checkBackendHealth = async () => {
  console.log('Checking backend server health...');
  
  try {
    // Try direct connection to backend
    const response = await axios.get('http://localhost:5000', {
      timeout: 3000, // 3 second timeout
      validateStatus: () => true // Accept any status
    });
    
    console.log('Backend server health check response:', response.status);
    
    // Any response means the server is running, even if it's an error
    return {
      isRunning: true,
      status: response.status,
      headers: response.headers
    };
  } catch (error) {
    console.error('Backend server not reachable:', error.message);
    return {
      isRunning: false,
      error: error.message
    };
  }
};

export default testBackendConnection;
