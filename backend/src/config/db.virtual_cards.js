/**
 * This script creates the virtual_cards table in the database
 */
const { pool, query } = require('./db.config');

async function createVirtualCardsTable() {
  try {
    console.log('Checking if virtual_cards table exists...');
    
    // Check if table exists
    const tableExists = await query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'virtual_cards')"
    );
    
    if (tableExists.rows[0].exists) {
      console.log('virtual_cards table already exists');
      return;
    }
    
    console.log('Creating virtual_cards table...');
    
    // Create virtual_cards table
    await query(`
      CREATE TABLE virtual_cards (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        card_number VARCHAR(16) NOT NULL,
        cardholder_name VARCHAR(100) NOT NULL,
        expiry_date VARCHAR(5) NOT NULL,
        cvv VARCHAR(3) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'inactive',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        CONSTRAINT unique_customer_card UNIQUE (customer_id)
      )
    `);
    
    console.log('virtual_cards table created successfully');
  } catch (error) {
    console.error('Error creating virtual_cards table:', error);
    throw error;
  }
}

// If this file is run directly, execute the migration
if (require.main === module) {
  (async () => {
    try {
      await createVirtualCardsTable();
      console.log('Migration completed successfully');
      process.exit(0);
    } catch (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
  })();
}

module.exports = { createVirtualCardsTable };
