const CardModel = require('../models/card.model');
const { ApiError } = require('../utils/error.utils');

class CardController {
  /**
   * Apply for a new virtual card
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async applyForCard(req, res) {
    try {
      const customerId = req.user.id;
      
      // Check if the user has accepted the terms and conditions
      if (!req.body.termsAccepted) {
        throw new ApiError(400, 'You must accept the terms and conditions to apply for a virtual card');
      }
      
      const card = await CardModel.create(customerId);
      
      return res.status(201).json({
        success: true,
        message: 'Virtual card application successful, awaiting activation',
        data: {
          card: {
            id: card.id,
            status: card.status,
            created_at: card.created_at
          }
        }
      });
    } catch (error) {
      console.error('Error applying for virtual card:', error);
      
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal server error';
      
      return res.status(statusCode).json({
        success: false,
        message: message
      });
    }
  }
  
  /**
   * Get customer's virtual card
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getMyCard(req, res) {
    try {
      const customerId = req.user.id;
      const card = await CardModel.getByCustomerId(customerId);
      
      if (!card) {
        return res.status(404).json({
          success: false,
          message: 'No virtual card found'
        });
      }
      
      // Mask card number for security
      const maskedCardNumber = card.card_number.replace(/^(\d{4})(\d{8})(\d{4})$/, '$1 XXXX XXXX $3');
      
      return res.status(200).json({
        success: true,
        data: {
          card: {
            id: card.id,
            cardholder_name: card.cardholder_name,
            card_number: card.status === 'active' ? maskedCardNumber : null,
            expiry_date: card.status === 'active' ? card.expiry_date : null,
            cvv: null, // Never send CVV to frontend
            status: card.status,
            created_at: card.created_at
          }
        }
      });
    } catch (error) {
      console.error('Error retrieving virtual card:', error);
      
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal server error';
      
      return res.status(statusCode).json({
        success: false,
        message: message
      });
    }
  }
  
  /**
   * Get customer's full card details (only available for active cards)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getFullCardDetails(req, res) {
    try {
      const customerId = req.user.id;
      const card = await CardModel.getByCustomerId(customerId);
      
      if (!card) {
        return res.status(404).json({
          success: false,
          message: 'No virtual card found'
        });
      }
      
      if (card.status !== 'active') {
        return res.status(403).json({
          success: false,
          message: 'Your card needs to be activated before you can view full details'
        });
      }
      
      // Format card number with spaces for display
      const formattedCardNumber = card.card_number.replace(/(\d{4})/g, '$1 ').trim();
      
      return res.status(200).json({
        success: true,
        data: {
          card: {
            id: card.id,
            cardholder_name: card.cardholder_name,
            card_number: formattedCardNumber,
            expiry_date: card.expiry_date,
            cvv: card.cvv, // Only send CVV when explicitly requesting full details
            status: card.status,
            created_at: card.created_at
          }
        }
      });
    } catch (error) {
      console.error('Error retrieving full card details:', error);
      
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal server error';
      
      return res.status(statusCode).json({
        success: false,
        message: message
      });
    }
  }
  
  /**
   * Get all cards (for bankers only)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async getAllCards(req, res) {
    try {
      const cards = await CardModel.getAllCards();
      
      // Mask card numbers for security
      const maskedCards = cards.map(card => ({
        ...card,
        card_number: card.card_number.replace(/^(\d{4})(\d{8})(\d{4})$/, '$1 XXXX XXXX $3'),
        cvv: undefined // Remove CVV entirely
      }));
      
      return res.status(200).json({
        success: true,
        data: {
          cards: maskedCards
        }
      });
    } catch (error) {
      console.error('Error retrieving all cards:', error);
      
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal server error';
      
      return res.status(statusCode).json({
        success: false,
        message: message
      });
    }
  }
  
  /**
   * Update card status (for bankers only)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async updateCardStatus(req, res) {
    try {
      const { cardId } = req.params;
      const { status } = req.body;
      
      if (!cardId || !status) {
        throw new ApiError(400, 'Card ID and status are required');
      }
      
      const updatedCard = await CardModel.updateStatus(cardId, status);
      
      return res.status(200).json({
        success: true,
        message: `Card has been ${status === 'active' ? 'activated' : 'deactivated'}`,
        data: {
          card: {
            id: updatedCard.id,
            status: updatedCard.status,
            updated_at: new Date().toISOString()
          }
        }
      });
    } catch (error) {
      console.error('Error updating card status:', error);
      
      const statusCode = error.statusCode || 500;
      const message = error.message || 'Internal server error';
      
      return res.status(statusCode).json({
        success: false,
        message: message
      });
    }
  }
}

module.exports = CardController;
