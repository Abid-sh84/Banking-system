const express = require('express');
const router = express.Router();
const CardController = require('../controllers/card.controller');
const { verifyAuth, isBanker, isCustomer } = require('../middleware/auth.middleware');

// Customer routes
router.post('/apply', verifyAuth, isCustomer, CardController.applyForCard);
router.get('/my-card', verifyAuth, isCustomer, CardController.getMyCard);
router.get('/my-card/full-details', verifyAuth, isCustomer, CardController.getFullCardDetails);

// Banker routes
router.get('/all', verifyAuth, isBanker, CardController.getAllCards);
router.patch('/:cardId/status', verifyAuth, isBanker, CardController.updateCardStatus);

module.exports = router;
