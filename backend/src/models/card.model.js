const { query } = require('../config/db.config');
const { ApiError } = require('../utils/error.utils');
const crypto = require('crypto');

class CardModel {
  // Generate a random card number (16 digits)
  static generateCardNumber() {
    // Generate a random 16-digit number with bank identifier prefix
    return '4' + Math.floor(100000000000000 + Math.random() * 900000000000000).toString();
  }

  // Generate expiry date (current month + 5 years)
  static generateExpiryDate() {
    const now = new Date();
    const expiryMonth = now.getMonth() + 1; // Add 1 because getMonth() returns 0-11
    const expiryYear = now.getFullYear() + 5;
    return `${expiryMonth.toString().padStart(2, '0')}/${(expiryYear % 100).toString().padStart(2, '0')}`;
  }

  // Generate CVV (3 random digits)
  static generateCVV() {
    return Math.floor(100 + Math.random() * 900).toString();
  }

  // Create a new virtual card for a customer
  static async create(customerId) {
    try {
      // Check if customer already has a card
      const existingCard = await query(
        'SELECT * FROM virtual_cards WHERE customer_id = $1',
        [customerId]
      );
      
      if (existingCard.rows.length > 0) {
        throw new ApiError(409, 'Customer already has a virtual card');
      }
      
      // Get customer details for card name
      const customerResult = await query(
        'SELECT name FROM customers WHERE id = $1',
        [customerId]
      );
      
      if (customerResult.rows.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      const customerName = customerResult.rows[0].name;
      
      // Generate card details
      const cardNumber = this.generateCardNumber();
      const expiryDate = this.generateExpiryDate();
      const cvv = this.generateCVV();
      
      // Insert card into database
      const result = await query(
        'INSERT INTO virtual_cards (customer_id, card_number, cardholder_name, expiry_date, cvv, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [customerId, cardNumber, customerName, expiryDate, cvv, 'inactive'] // Cards are created as inactive by default
      );
      
      return {
        id: result.rows[0].id,
        customer_id: customerId,
        card_number: cardNumber,
        cardholder_name: customerName,
        expiry_date: expiryDate,
        cvv: cvv,
        status: 'inactive'
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error creating virtual card: ${error.message}`);
    }
  }
  
  // Get card by customer ID
  static async getByCustomerId(customerId) {
    try {
      const result = await query(
        'SELECT * FROM virtual_cards WHERE customer_id = $1',
        [customerId]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      throw new ApiError(500, `Error retrieving virtual card: ${error.message}`);
    }
  }
  
  // Update card status (activate/deactivate)
  static async updateStatus(cardId, status) {
    try {
      if (!['active', 'inactive', 'blocked'].includes(status)) {
        throw new ApiError(400, 'Invalid card status');
      }
      
      const result = await query(
        'UPDATE virtual_cards SET status = $1 WHERE id = $2 RETURNING *',
        [status, cardId]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Card not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error updating card status: ${error.message}`);
    }
  }
  
  // Get all cards (for banker dashboard)
  static async getAllCards() {
    try {
      const result = await query(`
        SELECT vc.id, vc.customer_id, c.name as customer_name, vc.card_number, 
        vc.cardholder_name, vc.expiry_date, vc.status, vc.created_at
        FROM virtual_cards vc
        JOIN customers c ON vc.customer_id = c.id
        ORDER BY vc.created_at DESC
      `);
      
      return result.rows;
    } catch (error) {
      throw new ApiError(500, `Error retrieving virtual cards: ${error.message}`);
    }
  }
}

module.exports = CardModel;
