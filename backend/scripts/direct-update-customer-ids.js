// Direct script to update all missing customer_id values
const { pool } = require('../src/config/db.config');

async function updateCustomerIds() {
  try {
    console.log('Connecting to database to update customer_ids...');
      // Find customers with missing customer_ids
    const customersWithoutIds = await pool.query(
      'SELECT id FROM customers WHERE customer_id IS NULL OR customer_id = \'\''
    );
    
    console.log(`Found ${customersWithoutIds.rows.length} customers without customer_id`);
    
    // Update each customer with a new customer_id
    for (const customer of customersWithoutIds.rows) {
      const customerId = 'CUST' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
      
      await pool.query(
        'UPDATE customers SET customer_id = $1 WHERE id = $2',
        [customerId, customer.id]
      );
      
      console.log(`Updated customer ID ${customer.id} with customer_id: ${customerId}`);
    }
    
    console.log('All missing customer_ids have been updated');
      // Verify no customers are missing customer_ids
    const verifyQuery = await pool.query(
      'SELECT COUNT(*) as count FROM customers WHERE customer_id IS NULL OR customer_id = \'\''
    );
    
    const missingCount = parseInt(verifyQuery.rows[0].count);
    console.log(`Verification: ${missingCount} customers still missing customer_id`);
    
    if (missingCount === 0) {
      console.log('Success: All customers now have a customer_id');
    }
    
  } catch (error) {
    console.error('Error updating customer_ids:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run if called directly
if (require.main === module) {
  updateCustomerIds()
    .then(() => {
      console.log('Update completed successfully');
      process.exit(0);
    })
    .catch(err => {
      console.error('Error running update:', err);
      process.exit(1);
    });
}

module.exports = updateCustomerIds;
