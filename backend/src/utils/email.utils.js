const nodemailer = require('nodemailer');
const { ApiError } = require('./error.utils');

/**
 * Email service for sending notifications
 */
class EmailService {  constructor() {    // Log email configuration (without sensitive data)
    console.log('Initializing email service with settings:');
    console.log('- SERVICE:', process.env.EMAIL_SERVICE);
    console.log('- HOST:', process.env.EMAIL_HOST);
    console.log('- PORT:', process.env.EMAIL_PORT);
    console.log('- SECURE:', process.env.EMAIL_SECURE);
    console.log('- USER:', process.env.EMAIL_USER);
    console.log('- FROM:', process.env.EMAIL_FROM);
      // Environment variables for email configuration
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: process.env.EMAIL_SECURE !== 'false', // Default to true
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  /**
   * Send a transaction notification email
   * @param {Object} emailData - Email data including recipient, subject, and details
   * @returns {Promise} - Promise that resolves when email is sent
   */  async sendTransactionNotification(emailData) {
    try {
      console.log('Attempting to send email notification');
      
      // Check for valid email data
      if (!emailData || !emailData.to || !emailData.to.trim()) {
        console.error('Missing recipient email address:', emailData?.to);
        return { success: false, error: 'Missing recipient email' };
      }
      
      const { to, subject, transactionDetails } = emailData;
      console.log(`Sending ${subject} email to: ${to}`);
      
      if (!transactionDetails || !transactionDetails.amount || !transactionDetails.type) {
        console.error('Missing or invalid transaction details');
        return { success: false, error: 'Invalid transaction details' };
      }
      
      const {
        type,
        amount,
        description = 'Transaction',
        balance = 0,
        transactionId = 'TXN' + Date.now(),
        date = new Date().toLocaleString()
      } = transactionDetails;
      
      console.log('Email details:', { to, subject, type, amount, balance, transactionId });

      // Format currency
      const formattedAmount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(amount);

      const formattedBalance = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(balance);

      // Create email content based on transaction type
      let emailContent = '';
      
      if (type === 'transfer' || type === 'withdrawal') {
        // Debit notification
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="background-color: #f44336; color: white; padding: 10px; text-align: center; border-radius: 5px 5px 0 0;">
              <h2>Debit Alert</h2>
            </div>
            <div style="padding: 20px;">
              <p>Dear Customer,</p>
              <p>Your account has been debited.</p>
              
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Amount:</strong> ${formattedAmount}</p>
                <p><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Available Balance:</strong> ${formattedBalance}</p>
              </div>
              
              <p>If you did not authorize this transaction, please contact our customer service immediately.</p>
              <p>Thank you for banking with Modern Bank India.</p>
            </div>
            <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px;">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        `;
      } else if (type === 'deposit' || type === 'received') {
        // Credit notification
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="background-color: #4CAF50; color: white; padding: 10px; text-align: center; border-radius: 5px 5px 0 0;">
              <h2>Credit Alert</h2>
            </div>
            <div style="padding: 20px;">
              <p>Dear Customer,</p>
              <p>Your account has been credited.</p>
              
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Amount:</strong> ${formattedAmount}</p>
                <p><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Available Balance:</strong> ${formattedBalance}</p>
              </div>
              
              <p>Thank you for banking with Modern Bank India.</p>
            </div>
            <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px;">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        `;
      }

      // Send email
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html: emailContent
      };      console.log('Sending email with options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject
      });
      
      try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);
        return info;
      } catch (emailError) {
        console.error('Nodemailer error details:', emailError);
        throw emailError;  // Re-throw for better debugging
      }
    } catch (error) {
      console.error('Email sending error:', error);
      // Log all available transport configuration for debugging
      console.error('Transporter configuration:', {
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: '********' // Password masked for security
        }
      });
      // Don't throw error to prevent transaction failure if email fails
      // Just log it and continue
    }
  }
  /**
   * Send a custom email with HTML content
   * @param {Object} emailData - Email data including recipient, subject, and HTML content
   * @returns {Promise} - Promise that resolves when email is sent
   */
  async sendCustomEmail(emailData) {
    try {
      console.log('Attempting to send custom email');
      
      // Check for valid email data
      if (!emailData || !emailData.to || !emailData.to.trim()) {
        console.error('Missing recipient email address:', emailData?.to);
        return { success: false, error: 'Missing recipient email' };
      }
      
      const { to, subject, html } = emailData;
      console.log(`Sending ${subject} email to: ${to}`);
      
      // Send email
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html
      };
      
      console.log('Sending custom email with options:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject
      });
      
      try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log('Custom email sent successfully:', info);
        return info;
      } catch (emailError) {
        console.error('Nodemailer error details:', emailError);
        throw emailError;  // Re-throw for better debugging
      }
    } catch (error) {
      console.error('Email sending error:', error);
      // Log all available transport configuration for debugging
      console.error('Transporter configuration:', {
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: '********' // Password masked for security
        }
      });
      // Don't throw error to prevent transaction failure if email fails
      // Just log it and continue
    }
  }

  /**
   * Test the email configuration by sending a test email
   * @param {string} testEmail - The email address to send the test to
   * @returns {Promise} - Promise that resolves when email is sent
   */
  async testEmailConfig(testEmail) {
    try {
      console.log('Testing email configuration...');
      console.log('Using SMTP settings:', {
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: '********' // Password masked for security
        }
      });
      
      // Simple test email
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: testEmail,
        subject: 'Email Notification Test',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2>Test Email</h2>
            <p>This is a test email to verify the notification system is working correctly.</p>
            <p>Time sent: ${new Date().toLocaleString()}</p>
          </div>
        `
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Test email sent successfully:', info);
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      console.error('Test email error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create a singleton instance
const emailService = new EmailService();

module.exports = emailService;
