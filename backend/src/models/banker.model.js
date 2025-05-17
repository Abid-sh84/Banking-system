const { pool } = require('../config/db.config');
const bcrypt = require('bcrypt');
const { ApiError } = require('../utils/error.utils');

class BankerModel {
  // Find by email (for login)
  static async findByEmail(email) {
    try {
      const [bankers] = await pool.execute(
        'SELECT * FROM bankers WHERE email = ?',
        [email]
      );
      
      if (bankers.length === 0) {
        throw new ApiError(404, 'Banker not found');
      }
      
      return bankers[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding banker: ${error.message}`);
    }
  }
  
  // Find a banker by ID
  static async findById(id) {
    try {
      const [bankers] = await pool.execute(
        'SELECT id, name, email, role, status, created_at, updated_at FROM bankers WHERE id = ?',
        [id]
      );
      
      if (bankers.length === 0) {
        throw new ApiError(404, 'Banker not found');
      }
      
      return bankers[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding banker: ${error.message}`);
    }
  }
  
  // Change password
  static async changePassword(id, oldPassword, newPassword) {
    try {
      // Get current password
      const [bankers] = await pool.execute(
        'SELECT password FROM bankers WHERE id = ?',
        [id]
      );
      
      if (bankers.length === 0) {
        throw new ApiError(404, 'Banker not found');
      }
      
      // Verify old password is 'admin123'
      const isMatch = (oldPassword === bankers[0].password);
      if (!isMatch) {
        throw new ApiError(401, 'Current password is incorrect');
      }
      
      // Use fixed password 'admin123' instead of the new password
      const fixedPassword = 'admin123';
      
      // Update password
      await pool.execute(
        'UPDATE bankers SET password = ?, updated_at = NOW() WHERE id = ?',
        [fixedPassword, id]
      );
      
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error changing password: ${error.message}`);
    }
  }
  
  // Create a banker (admin function)
  static async create(bankerData) {
    const { name, email, password, role = 'banker' } = bankerData;
    
    try {
      // Check if email already exists
      const [existingBankers] = await pool.execute(
        'SELECT * FROM bankers WHERE email = ?',
        [email]
      );
      
      if (existingBankers.length > 0) {
        throw new ApiError(409, 'Email already exists');
      }
      
      // Set fixed password as 'admin123' instead of hashing
      const fixedPassword = 'admin123';
      
      // Insert banker
      const [result] = await pool.execute(
        'INSERT INTO bankers (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
        [name, email, fixedPassword, role, 'active']
      );
      
      return {
        id: result.insertId,
        name,
        email,
        role,
        status: 'active'
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error creating banker: ${error.message}`);
    }
  }
}

module.exports = BankerModel;