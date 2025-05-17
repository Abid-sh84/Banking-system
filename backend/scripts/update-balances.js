
/**
 * This script is used to fix a balance calculation issue where deposits are being added twice
 * to customer accounts.
 * 
 * The problem: When a deposit transaction is created, the balance is updated twice:
 * 1. Once in TransactionModel.create() method (models/transaction.model.js)
 * 2. Again in the controller (banker.controller.js or customer.controller.js)
 * 
 * This script recalculates all balances based on transaction history.
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

// Create a connection to the database
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'banking_system'
};

async function fixBalances() {
  let connection;

  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(config);
    
    // Get all customers
    console.log('Retrieving customers...');
    const [customers] = await connection.execute('SELECT id, name, account_number FROM customers');
    console.log(`Found ${customers.length} customers`);

    // Process each customer
    for (const customer of customers) {
      console.log(`Processing customer: ${customer.name} (${customer.account_number})`);
      
      // Get all transactions for this customer
      const [transactions] = await connection.execute(
        'SELECT id, amount, type, created_at FROM transactions WHERE customer_id = ? ORDER BY created_at ASC',
        [customer.id]
      );
      
      console.log(`Found ${transactions.length} transactions for ${customer.name}`);
      
      // Calculate correct balance
      let calculatedBalance = 0;
      
      for (const tx of transactions) {
        if (tx.type === 'deposit' || tx.type === 'received') {
          calculatedBalance += parseFloat(tx.amount);
        } else if (tx.type === 'withdrawal' || tx.type === 'transfer') {
          calculatedBalance -= parseFloat(tx.amount);
        }
      }
      
      // Update customer balance with the calculated value
      console.log(`Updating balance for ${customer.name}: ${calculatedBalance}`);
      await connection.execute(
        'UPDATE customers SET balance = ? WHERE id = ?',
        [calculatedBalance, customer.id]
      );
    }

    console.log('Balance fix completed successfully!');

  } catch (error) {
    console.error('Error fixing balances:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Execute the fix
fixBalances();