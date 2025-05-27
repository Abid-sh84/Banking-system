/**
 * This script attempts to fix email sending issues by patching the dotenv configuration
 * to ensure environment variables are properly loaded.
 */
const fs = require('fs');
const path = require('path');

// Function to manually load variables from .env file
function loadEnvVariables() {
  try {
    const envPath = path.join(__dirname, '..', '..', '.env');
    console.log('Loading environment variables from:', envPath);
    
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf8');
      const envVars = envFile
        .split('\n')
        .filter(line => {
          return line.trim() !== '' && 
                 !line.trim().startsWith('#') && 
                 !line.trim().startsWith('//') && 
                 line.includes('=');
        })
        .reduce((acc, line) => {
          const match = line.match(/^([^=]+)=(.*)$/);
          if (match) {
            let key = match[1].trim();
            let value = match[2].trim();
            
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
              value = value.substring(1, value.length - 1);
            }
            
            acc[key] = value;
          }
          return acc;
        }, {});
      
      // Set environment variables if they're not already set
      Object.keys(envVars).forEach(key => {
        if (!process.env[key]) {
          process.env[key] = envVars[key];
        }
      });
      
      console.log('Email-related environment variables:');
      Object.keys(process.env)
        .filter(key => key.includes('EMAIL'))
        .forEach(key => {
          console.log(`- ${key}: ${key.includes('PASSWORD') ? '********' : process.env[key]}`);
        });
      
      return true;
    }
    
    console.error('.env file not found at:', envPath);
    return false;
  } catch (error) {
    console.error('Error loading environment variables:', error);
    return false;
  }
}

// Load environment variables
loadEnvVariables();

module.exports = { loadEnvVariables };
