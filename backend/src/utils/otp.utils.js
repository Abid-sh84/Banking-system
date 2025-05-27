// OTP Generation and Verification Utilities
const crypto = require('crypto');
const { pool, query } = require('../config/db.config');
const { ApiError } = require('./error.utils');
const emailService = require('./email.utils');

class OTPService {
  /**
   * Generate a 6-digit OTP
   * @returns {string} The generated OTP
   */
  static generateOTP() {
    // Generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Save registration OTP and user data to the database
   * @param {Object} userData - User registration data
   * @param {string} otp - The generated OTP
   * @returns {Promise} Promise that resolves when OTP is saved
   */
  static async saveRegistrationOTP(userData, otp) {
    const { name, email, password, address, phone, accountType } = userData;
    
    try {
      // Set OTP to expire after 15 minutes
      const expiresAt = new Date(Date.now() + 15 * 60000); // 15 minutes
      
      // Check if there's already an entry for this email
      const existingOTP = await query(
        'SELECT * FROM registration_otp WHERE email = $1',
        [email]
      );
      
      if (existingOTP.rows.length > 0) {
        // Update the existing entry
        await query(
          'UPDATE registration_otp SET otp = $1, name = $2, password = $3, address = $4, phone = $5, account_type = $6, expires_at = $7, attempted_count = 0 WHERE email = $8',
          [otp, name, password, address, phone, accountType || 'savings', expiresAt, email]
        );
      } else {
        // Create a new entry
        await query(
          'INSERT INTO registration_otp (email, otp, name, password, address, phone, account_type, expires_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
          [email, otp, name, password, address, phone, accountType || 'savings', expiresAt]
        );
      }
      
      return true;
    } catch (error) {
      console.error('Error saving registration OTP:', error);
      throw new ApiError(500, `Error saving registration OTP: ${error.message}`);
    }
  }

  /**
   * Verify the OTP provided by the user
   * @param {string} email - The user's email
   * @param {string} providedOTP - The OTP provided by the user
   * @returns {Promise<Object>} The user data if verification is successful
   */
  static async verifyOTP(email, providedOTP) {
    try {
      // Get the stored OTP
      const result = await query(
        'SELECT * FROM registration_otp WHERE email = $1',
        [email]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'OTP not found. Please request a new OTP.');
      }
      
      const otpRecord = result.rows[0];
      
      // Check if OTP has expired
      const now = new Date();
      const expiresAt = new Date(otpRecord.expires_at);
      
      if (now > expiresAt) {
        throw new ApiError(400, 'OTP has expired. Please request a new OTP.');
      }
      
      // Check if too many attempts
      if (otpRecord.attempted_count >= 5) {
        throw new ApiError(400, 'Too many failed attempts. Please request a new OTP.');
      }
      
      // Compare the OTPs
      if (otpRecord.otp !== providedOTP) {
        // Increment the attempt count
        await query(
          'UPDATE registration_otp SET attempted_count = attempted_count + 1 WHERE email = $1',
          [email]
        );
        throw new ApiError(400, 'Invalid OTP. Please try again.');
      }
      
      return {
        name: otpRecord.name,
        email: otpRecord.email,
        password: otpRecord.password,
        address: otpRecord.address,
        phone: otpRecord.phone,
        accountType: otpRecord.account_type
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error verifying OTP: ${error.message}`);
    }
  }

  /**
   * Delete OTP record after successful verification
   * @param {string} email - The user's email
   * @returns {Promise} Promise that resolves when OTP record is deleted
   */
  static async deleteOTPRecord(email) {
    try {
      await query('DELETE FROM registration_otp WHERE email = $1', [email]);
      return true;
    } catch (error) {
      console.error('Error deleting OTP record:', error);
      // No need to throw here, just log the error
      return false;
    }
  }

  /**
   * Send OTP verification email
   * @param {string} email - The recipient's email
   * @param {string} name - The recipient's name
   * @param {string} otp - The OTP to send
   * @returns {Promise} Promise that resolves when email is sent
   */
  static async sendOTPEmail(email, name, otp) {
    try {
      console.log(`Sending OTP ${otp} to ${email}`);
      
      // Create email content
      const emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="background-color: #3b82f6; color: white; padding: 10px; text-align: center; border-radius: 5px 5px 0 0;">
            <h2>Email Verification</h2>
          </div>
          <div style="padding: 20px;">
            <p>Dear ${name},</p>
            <p>Thank you for registering with Modern Bank India. To complete your registration, please use the following One-Time Password (OTP):</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0; text-align: center;">
              <h3 style="font-size: 24px; letter-spacing: 5px; color: #3b82f6;">${otp}</h3>
            </div>
            
            <p>This OTP is valid for 15 minutes only.</p>
            <p>If you did not request this registration, please ignore this email.</p>
            <p>Thank you for banking with Modern Bank India.</p>
          </div>
          <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px;">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `;
      
      // Define email options
      const mailOptions = {
        to: email,
        subject: 'Modern Bank India - Email Verification',
        html: emailContent
      };
      
      // Use the existing email service to send the email
      const sendResult = await emailService.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        ...mailOptions
      });
      
      console.log('OTP email sent successfully:', sendResult.messageId);
      return sendResult;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new ApiError(500, 'Failed to send verification email');
    }
  }
}

module.exports = OTPService;
