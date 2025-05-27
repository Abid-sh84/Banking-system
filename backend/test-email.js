const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Function to load environment variables manually from .env file
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, '.env');
    console.log('Loading environment variables from:', envPath);
    
    // Check if file exists
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach(line => {
        // Skip comments and empty lines
        if (line.trim().startsWith('#') || line.trim().startsWith('//') || !line.trim()) {
          return;
        }
        
        // Extract key-value pairs
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let value = match[2].trim();
          
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.substring(1, value.length - 1);
          }
          
          // Set the environment variable if not already set
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      });
      
      console.log('Environment variables loaded successfully');
      return true;
    } else {
      console.error('.env file not found at:', envPath);
      return false;
    }
  } catch (error) {
    console.error('Error loading .env file:', error);
    return false;
  }
}

// Load environment variables before starting
loadEnv();
require('dotenv').config(); // Also try the standard dotenv load as a backup

// Function to test email sending
async function testEmail() {
  console.log('Starting email test...');
  console.log('Email settings from .env:');
  console.log('- EMAIL_SERVICE:', process.env.EMAIL_SERVICE);
  console.log('- EMAIL_HOST:', process.env.EMAIL_HOST);
  console.log('- EMAIL_PORT:', process.env.EMAIL_PORT);
  console.log('- EMAIL_SECURE:', process.env.EMAIL_SECURE);
  console.log('- EMAIL_USER:', process.env.EMAIL_USER);
  console.log('- EMAIL_FROM:', process.env.EMAIL_FROM);
  
  // Show all email-related environment variables
  console.log('\nAll email-related environment variables:');
  Object.keys(process.env).filter(key => key.includes('EMAIL')).forEach(key => {
    console.log(`- ${key}: ${key.includes('PASSWORD') ? '********' : process.env[key]}`);
  });
  // Create transporter with fallback values for Gmail
  const emailService = process.env.EMAIL_SERVICE || 'gmail';
  const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const emailPort = process.env.EMAIL_PORT || 465;
  const emailSecure = process.env.EMAIL_SECURE === 'true' || true;
  const emailUser = process.env.EMAIL_USER || 'technoabid.dev@gmail.com';
  const emailPassword = process.env.EMAIL_PASSWORD || 'smztgueklsboptqp';
  const emailFrom = process.env.EMAIL_FROM || '"Modern Bank India" <technoabid.dev@gmail.com>';
  
  console.log('\nUsing email configuration:');
  console.log('- Service:', emailService);
  console.log('- Host:', emailHost);
  console.log('- Port:', emailPort);
  console.log('- Secure:', emailSecure);
  console.log('- User:', emailUser);
  console.log('- From:', emailFrom);
  
  const transporter = nodemailer.createTransport({
    service: emailService,
    host: emailHost,
    port: emailPort,
    secure: emailSecure,
    auth: {
      user: emailUser,
      pass: emailPassword
    },
    debug: true, // Enable debug logs
    logger: true  // Log to console
  });

  console.log('Verifying connection to mail server...');
  try {
    await transporter.verify();
    console.log('Mail server connection verified successfully!');
  } catch (verifyError) {
    console.error('Mail server connection verification failed:', verifyError);
    return false;
  }

  // Create test message
  const testEmail = process.argv[2] || process.env.EMAIL_USER; // Use command line argument or fallback to sender
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: testEmail,
    subject: 'Banking System - Email Test',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2>Email Test</h2>
        <p>This is a test email to verify that the email system is working correctly.</p>
        <p>Time sent: ${new Date().toLocaleString()}</p>
      </div>
    `
  };

  console.log('Sending test email to:', testEmail);
    // Send mail
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending test email:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Gmail-specific troubleshooting
    if (emailService.toLowerCase().includes('gmail')) {
      console.log('\nTROUBLESHOOTING TIPS FOR GMAIL:');
      console.log('1. For Gmail, you need to use an App Password for your account');
      console.log('   a. Go to your Google Account > Security > 2-Step Verification');
      console.log('   b. At the bottom, click on "App passwords"');
      console.log('   c. Create a new app password for "Mail" and "Other"');
      console.log('   d. Use this generated password in your .env file');
      console.log('2. Check if your Google account has other security restrictions');
      console.log('3. Make sure you\'re not exceeding Gmail sending limits');
      console.log('4. Make sure the recipient email is valid');
    }
    
    // Common issues regardless of provider
    console.log('\nGENERAL TROUBLESHOOTING:');
    console.log('1. Check if your SMTP settings are correct (host, port, secure)');
    console.log('2. Make sure the credentials (username/password) are correct');
    console.log('3. Check your internet connection and firewall settings');
    console.log('4. Try a different email service provider');
    console.log('5. Check for typos in your .env file');
    
    return false;
  }
}

// Run the test
testEmail()
  .then(success => {
    if (success) {
      console.log('\nEMAIL TEST PASSED ✅');
    } else {
      console.log('\nEMAIL TEST FAILED ❌');
    }
  })
  .catch(error => {
    console.error('Unexpected error in test:', error);
    console.log('\nEMAIL TEST FAILED ❌');
  });
