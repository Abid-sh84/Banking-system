// Special debug file to diagnose Vite middleware mode errors
const { createServer } = require('vite');
const path = require('path');
const fs = require('fs');

// Main function to test Vite server creation
async function testViteServer() {
  try {
    // Path to vite.config.js
    const configPath = path.resolve(__dirname, 'vite.config.js');
    console.log(`Checking config file at: ${configPath}`);
    
    if (!fs.existsSync(configPath)) {
      console.error('Could not find vite.config.js file!');
      return;
    }
    
    console.log('Attempting to create Vite server...');
    const server = await createServer({
      configFile: configPath,
      server: {
        port: 5173,
        strictPort: true,
      },
      logLevel: 'info',
    });
    
    console.log('Vite server created successfully!');
    
    // Cleanup
    await server.close();
    console.log('Server closed.');
    
    return true;
  } catch (error) {
    console.error('Error creating Vite server:', error);
    return false;
  }
}

// Run the test
testViteServer()
  .then((success) => {
    console.log(`Test completed ${success ? 'successfully' : 'with errors'}.`);
    process.exit(success ? 0 : 1);
  })
  .catch((err) => {
    console.error('Test failed with error:', err);
    process.exit(1);
  });
