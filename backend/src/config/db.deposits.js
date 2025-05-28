const { pool, query } = require('./db.config');

/**
 * Initialize the deposits table in the database
 * This creates a new table to store different types of deposits (FD, RD, etc.)
 */
async function initializeDepositsTable() {
  console.log('Initializing deposits table...');
  
  try {
    // Create deposits table to track different types of deposits
    await query(`
      CREATE TABLE IF NOT EXISTS deposits (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        amount DECIMAL(15, 2) NOT NULL,
        type VARCHAR(20) CHECK (type IN ('fixed', 'recurring', 'savings', 'tax_saving')) NOT NULL,
        interest_rate DECIMAL(5, 2) NOT NULL,
        start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        maturity_date TIMESTAMP NOT NULL,
        status VARCHAR(20) CHECK (status IN ('active', 'matured', 'broken', 'pending')) DEFAULT 'active',
        description TEXT,
        transaction_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE SET NULL
      )
    `);
    
    console.log('Deposits table checked/created successfully');
    return { success: true, message: 'Deposits table initialized successfully' };
  } catch (error) {
    console.error('Error initializing deposits table:', error);
    return { success: false, message: `Error initializing deposits table: ${error.message}` };
  }
}

module.exports = {
  initializeDepositsTable
};
