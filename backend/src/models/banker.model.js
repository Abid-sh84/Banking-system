const { pool, query } = require('../config/db.config');
const bcrypt = require('bcrypt');
const { ApiError } = require('../utils/error.utils');

class BankerModel {
  // Find by email (for login)
  static async findByEmail(email) {
    try {
      const result = await query(
        'SELECT * FROM bankers WHERE email = $1',
        [email]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Banker not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding banker: ${error.message}`);
    }
  }
  
  // Find a banker by ID
  static async findById(id) {
    try {
      const result = await query(
        'SELECT id, name, email, role, status, created_at, updated_at FROM bankers WHERE id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Banker not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding banker: ${error.message}`);
    }
  }
  
  // Change password
  static async changePassword(id, oldPassword, newPassword) {
    try {
      // Get current password
      const result = await query(
        'SELECT password FROM bankers WHERE id = $1',
        [id]
            );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Banker not found');
      }
      
      // Verify old password
      const isMatch = await bcrypt.compare(oldPassword, result.rows[0].password);
      if (!isMatch) {
        throw new ApiError(401, 'Current password is incorrect');
      }
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update password
      await query(
        'UPDATE bankers SET password = $1, updated_at = NOW() WHERE id = $2',
        [hashedPassword, id]
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
      const existingBankers = await query(
        'SELECT * FROM bankers WHERE email = $1',
        [email]
      );
      
      if (existingBankers.rows.length > 0) {
        throw new ApiError(409, 'Email already exists');
      }
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.BANKER_PASSWORD, salt);
      
      // Insert banker
      const result = await query(
        'INSERT INTO bankers (name, email, password, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [name, email, hashedPassword, role, 'active']
      );
        return {
        id: result.rows[0].id,
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
