const { pool } = require('./src/config/db.config');

async function testDatabaseConstraints() {
  try {
    // Test different status values
    const statuses = ['active', 'inactive', 'frozen', 'ACTIVE', 'INACTIVE', 'FROZEN'];
    
    for (const status of statuses) {
      try {
        console.log(`Testing status: "${status}"`);
        const result = await pool.query('UPDATE customers SET status = $1 WHERE id = 1 RETURNING *', [status]);
        console.log(`Success with status: "${status}"`);
      } catch (err) {
        console.error(`Error with status "${status}":`, err.message);
        if (err.detail) console.error('Details:', err.detail);
        if (err.constraint) console.error('Constraint:', err.constraint);
      }
    }
    
    // Confirm current schema
    const tableSchema = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'customers' AND column_name = 'status'
    `);
    console.log('Status column definition:', tableSchema.rows);
    
    // Check for any constraints on the customers table
    const constraints = await pool.query(`
      SELECT conname, pg_get_constraintdef(oid) AS constraint_def
      FROM pg_constraint
      WHERE conrelid = 'customers'::regclass AND conname LIKE '%status%'
    `);
    console.log('Status constraints:', constraints.rows);
    
  } catch (error) {
    console.error('General error:', error);
  } finally {
    pool.end();
  }
}

testDatabaseConstraints();
