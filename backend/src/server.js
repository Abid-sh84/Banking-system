const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { pool, testConnection } = require('./config/db.config');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:8080', 
    'http://localhost:5173',
    process.env.FRONTEND_URL || 'https://banking-system-frontend.vercel.app',
    /\.vercel\.app$/  // Allow all vercel.app subdomains
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Banking API' });
});

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'up',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Import routes
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const bankerRoutes = require('./routes/banker.routes');
const transactionRoutes = require('./routes/transaction.routes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/banker', bankerRoutes);  // Make sure this matches frontend (not plural "bankers")
app.use('/api/transactions', transactionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  try {
    // Test database connection
    await testConnection();
    
    // Run database update if connection is successful
    try {
      // Only run database updates if needed
      const updateDatabase = require('./config/db.update');
      await updateDatabase();
      
      console.log('Database schema updated successfully');
    } catch (error) {
      console.error('Error updating database schema:', error);
    }
  } catch (error) {
    console.warn('Database connection failed, but server is still running.');
    console.warn('Some features requiring database access will not work.');
  }
});
