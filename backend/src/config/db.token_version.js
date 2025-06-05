// Script to add token_version column to customers table
const { pool } = require('./db.config');

async function addTokenVersionColumn() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log('Adding token_version column to customers table...');
    
    // Check if column already exists
    const columnCheckResult = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='customers' AND column_name='token_version'
    `);
    
    if (columnCheckResult.rows.length === 0) {
      // Add the column
      await client.query(`
        ALTER TABLE customers 
        ADD COLUMN token_version INTEGER DEFAULT 0
      `);
      console.log('token_version column added successfully');
    } else {
      console.log('token_version column already exists');
    }
    
    await client.query('COMMIT');
    console.log('Migration completed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Execute migration when this file is run directly
if (require.main === module) {
  addTokenVersionColumn()
    .then(() => {
      console.log('Token version migration completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Token version migration failed:', error);
      process.exit(1);
    });
}

module.exports = { addTokenVersionColumn };
