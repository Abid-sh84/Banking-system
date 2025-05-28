const { ApiError, asyncHandler } = require('../utils/error.utils');
const TransactionModel = require('../models/transaction.model');
const CustomerModel = require('../models/customer.model');
const DepositModel = require('../models/deposit.model');

// Algorithm to calculate CIBIL score based on customer's banking behavior
async function calculateCibilScore(customerId) {
  try {
    // Base score is 550 - can range from 300 to 900
    let baseScore = 550;
    
    // Get customer data
    const customer = await CustomerModel.findById(customerId);
    if (!customer) {
      throw new ApiError(404, 'Customer not found');
    }
    
    // Get transactions for the customer
    const transactions = await TransactionModel.findByCustomerId(customerId);
    
    // Get deposits for the customer
    const deposits = await DepositModel.getByCustomerId(customerId);
    
    // Factors that influence the score:
    
    // 1. Account balance (up to +100 points)
    // Higher balance = higher score
    const balanceFactor = Math.min(customer.balance / 5000 * 100, 100);
    
    // 2. Deposit consistency (up to +100 points)
    // More regular deposits = higher score
    let depositCount = 0;
    let withdrawalCount = 0;
    let bounceCount = 0;
    
    if (transactions && Array.isArray(transactions)) {
      depositCount = transactions.filter(t => t.type === 'deposit').length;
      withdrawalCount = transactions.filter(t => t.type === 'withdrawal').length;
      bounceCount = transactions.filter(t => t.status === 'failed').length;
    }
    
    const depositConsistencyFactor = Math.min(depositCount * 10, 100);
    
    // 3. Withdrawal frequency penalty (up to -50 points)
    // More withdrawals = lower score
    const withdrawalPenalty = Math.min(withdrawalCount * 5, 50);
    
    // 4. Failed transactions penalty (up to -100 points)
    // More failed transactions = lower score
    const bouncePenalty = Math.min(bounceCount * 20, 100);
    
    // 5. Fixed/recurring deposit bonus (up to +100 points)
    // Having FD/RD = higher score
    let depositBonus = 0;
    if (deposits && Array.isArray(deposits)) {
      const activeDeposits = deposits.filter(d => d.status === 'active');
      depositBonus = Math.min(activeDeposits.length * 25, 100);
    }
    
    // 6. Account age bonus (up to +50 points)
    // Older account = higher score
    const accountAge = (new Date() - new Date(customer.created_at)) / (1000 * 60 * 60 * 24 * 30); // in months
    const accountAgeBonus = Math.min(accountAge * 5, 50);
    
    // Calculate the final score
    let finalScore = baseScore + balanceFactor + depositConsistencyFactor - withdrawalPenalty - bouncePenalty + depositBonus + accountAgeBonus;
    
    // Ensure score is within 300-900 range
    finalScore = Math.max(300, Math.min(900, Math.round(finalScore)));
    
    return {
      score: finalScore,
      factors: {
        baseScore,
        balanceFactor,
        depositConsistencyFactor,
        withdrawalPenalty,
        bouncePenalty,
        depositBonus,
        accountAgeBonus
      },
      lastUpdated: new Date()
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error calculating CIBIL score: ${error.message}`);
  }
}

// Get CIBIL score for a customer
const getCustomerCibilScore = asyncHandler(async (req, res) => {
  const customerId = req.user.id;
  
  const cibilData = await calculateCibilScore(customerId);
  
  res.status(200).json({
    success: true,
    data: {
      score: cibilData.score,
      lastUpdated: cibilData.lastUpdated,
      factors: cibilData.factors
    }
  });
});

module.exports = {
  getCustomerCibilScore,
  calculateCibilScore
};
