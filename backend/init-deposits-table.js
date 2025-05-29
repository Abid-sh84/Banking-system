// Script to initialize the deposits table
const { initializeDepositsTable } = require('./src/config/db.deposits');

async function initializeTable() {
  try {
    console.log('Starting deposits table initialization...');
    const result = await initializeDepositsTable();
    console.log(result);
    console.log('Finished initialization process.');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing deposits table:', error);
    process.exit(1);
  }
}

initializeTable();
