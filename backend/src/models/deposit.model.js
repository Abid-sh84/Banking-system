const { pool, query } = require('../config/db.config');
const { ApiError } = require('../utils/error.utils');

class DepositModel {
  // Create a new deposit
  static async create(depositData) {
    const { 
      customer_id, 
      amount, 
      type, 
      interest_rate, 
      maturity_date, 
      description, 
      transaction_id
    } = depositData;
    
    try {
      // Insert the deposit record
      const result = await query(
        `INSERT INTO deposits 
         (customer_id, amount, type, interest_rate, maturity_date, description, transaction_id, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING id`,
        [customer_id, amount, type, interest_rate, maturity_date, description, transaction_id, 'active']
      );
      
      return {
        id: result.rows[0].id,
        customer_id,
        amount,
        type,
        interest_rate,
        maturity_date,
        description,
        status: 'active',
        transaction_id
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error creating deposit: ${error.message}`);
    }
  }
    // Create a fixed deposit
  static async createFixedDeposit(depositData) {
    // Set the type to fixed
    const depositDataCopy = { ...depositData };  // Create a copy to avoid modifying the original
    depositDataCopy.type = 'fixed';
    return this.create(depositDataCopy);
  }
  
  // Get all deposits for a customer
  static async getByCustomerId(customerId) {
    try {
      const result = await query(
        `SELECT d.*, 
         t.created_at as transaction_date,
         t.description as transaction_description
         FROM deposits d
         LEFT JOIN transactions t ON d.transaction_id = t.id
         WHERE d.customer_id = $1
         ORDER BY d.created_at DESC`,
        [customerId]
      );
      
      return result.rows;
    } catch (error) {
      throw new ApiError(500, `Error fetching deposits: ${error.message}`);
    }
  }
  
  // Get deposit by ID
  static async getById(id) {
    try {
      const result = await query(
        `SELECT d.*, 
         t.created_at as transaction_date,
         t.description as transaction_description
         FROM deposits d
         LEFT JOIN transactions t ON d.transaction_id = t.id
         WHERE d.id = $1`,
        [id]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Deposit not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error fetching deposit: ${error.message}`);
    }
  }
  
  // Get all deposits (for banker dashboard)
  static async getAll(limit = 100, offset = 0) {
    try {
      const result = await query(
        `SELECT d.*, 
         c.name as customer_name, c.account_number,
         t.created_at as transaction_date
         FROM deposits d
         JOIN customers c ON d.customer_id = c.id
         LEFT JOIN transactions t ON d.transaction_id = t.id
         ORDER BY d.created_at DESC
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      
      return result.rows;
    } catch (error) {
      throw new ApiError(500, `Error fetching all deposits: ${error.message}`);
    }
  }
  
  // Update deposit status
  static async updateStatus(id, status) {
    try {
      const validStatuses = ['active', 'matured', 'broken', 'pending'];
      
      if (!validStatuses.includes(status)) {
        throw new ApiError(400, 'Invalid deposit status');
      }
      
      const result = await query(
        'UPDATE deposits SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [status, id]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Deposit not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error updating deposit status: ${error.message}`);
    }
  }
    // Get deposits summary (for dashboard metrics)  // Create a recurring deposit
  static async createRecurringDeposit(depositData) {
    // Set the type to recurring
    const depositDataCopy = { ...depositData };  // Create a copy to avoid modifying the original
    depositDataCopy.type = 'recurring';
    return this.create(depositDataCopy);
  }
  
  // Create a savings deposit
  static async createSavingsDeposit(depositData) {
    // Set the type to savings
    const depositDataCopy = { ...depositData };  // Create a copy to avoid modifying the original
    depositDataCopy.type = 'savings';
    return this.create(depositDataCopy);
  }
  
  // Create a tax saving deposit
  static async createTaxSavingDeposit(depositData) {
    // Set the type to tax_saving
    const depositDataCopy = { ...depositData };  // Create a copy to avoid modifying the original
    depositDataCopy.type = 'tax_saving';
    return this.create(depositDataCopy);
  }
  
  static async getDepositsSummary() {
    try {
      const result = await query(`
        SELECT 
          COUNT(*) as total_count,
          COALESCE(SUM(amount), 0) as total_amount,
          
          -- Status-based metrics
          COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count,
          COALESCE(SUM(CASE WHEN status = 'active' THEN amount ELSE 0 END), 0) as active_amount,
          COUNT(CASE WHEN status = 'matured' THEN 1 END) as matured_count,
          COALESCE(SUM(CASE WHEN status = 'matured' THEN amount ELSE 0 END), 0) as matured_amount,
          
          -- Type-based metrics
          COUNT(CASE WHEN type = 'fixed' THEN 1 END) as fixed_count,
          COALESCE(SUM(CASE WHEN type = 'fixed' THEN amount ELSE 0 END), 0) as fixed_amount,
          COUNT(CASE WHEN type = 'recurring' THEN 1 END) as recurring_count,
          COALESCE(SUM(CASE WHEN type = 'recurring' THEN amount ELSE 0 END), 0) as recurring_amount,
          COUNT(CASE WHEN type = 'savings' THEN 1 END) as savings_count,
          COALESCE(SUM(CASE WHEN type = 'savings' THEN amount ELSE 0 END), 0) as savings_amount,
          COUNT(CASE WHEN type = 'tax_saving' THEN 1 END) as tax_saving_count,
          COALESCE(SUM(CASE WHEN type = 'tax_saving' THEN amount ELSE 0 END), 0) as tax_saving_amount
        FROM deposits
      `);
      
      // Handle null values
      const summary = result.rows[0] || {};
      Object.keys(summary).forEach(key => {
        if (summary[key] === null) summary[key] = 0;
      });
      
      return summary;
    } catch (error) {
      throw new ApiError(500, `Error fetching deposits summary: ${error.message}`);
    }
  }
}

module.exports = DepositModel;
