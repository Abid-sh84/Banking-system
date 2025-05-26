/**
 * Run this script to initialize all database tables
 */

const { createVirtualCardsTable } = require('./src/config/db.virtual_cards');
const { pool } = require('./src/config/db.config');

async function runMigrations() {
  try {
    console.log('Running database migrations...');
    
    // Run migrations in sequence
    await createVirtualCardsTable();
    
    console.log('All migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    // Close the DB pool
    try {
      await pool.end();
    } catch (err) {
      console.error('Error closing pool:', err);
    }
  }
}

runMigrations();
