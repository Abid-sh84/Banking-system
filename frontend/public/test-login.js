// Test the Vite proxy with the backend
// Run this in a browser console when on the frontend app

async function testLogin() {
  const email = 'customer@example.com';
  const password = 'customer123';
  
  console.log('Testing login with:', email);
  
  try {
    // Make the request directly to the frontend proxy
    const response = await fetch('/api/auth/login/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    console.log('Login response:', response.status);
    console.log('Response data:', data);
    
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
}

// Run the test
testLogin();
