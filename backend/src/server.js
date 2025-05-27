const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Apply email configuration fix 
require('./utils/email-fix');

const { pool, testConnection } = require('./config/db.config');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'http://localhost:5174', // Add this port for frontend development
    'http://localhost:8080',
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
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    const dbStatus = await testConnection();
    
    res.status(200).json({
      status: 'up',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: dbStatus ? 'connected' : 'disconnected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      database: 'error',
      error: error.message
    });
  }
});

// Import routes
const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const bankerRoutes = require('./routes/banker.routes');
const transactionRoutes = require('./routes/transaction.routes');
const cardRoutes = require('./routes/card.routes');
const testRoutes = require('./routes/test.routes');

// Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.originalUrl} | ${req.ip} | Content-Type: ${req.headers['content-type']}`);
  next();
});

// Routes with duplicate mappings to handle both /api prefix and direct paths
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes); // Add duplicate route without /api prefix to handle both proxy configurations
app.use('/api/customers', customerRoutes);
app.use('/customers', customerRoutes); // Duplicate without /api prefix
app.use('/api/banker', bankerRoutes);  // Make sure this matches frontend (not plural "bankers")
app.use('/banker', bankerRoutes); // Duplicate without /api prefix
app.use('/api/transactions', transactionRoutes);
app.use('/transactions', transactionRoutes); // Duplicate without /api prefix
app.use('/api/cards', cardRoutes);
app.use('/cards', cardRoutes); // Duplicate without /api prefix

// Test routes - only enabled in development
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/test', testRoutes);
  app.use('/test', testRoutes); // Duplicate without /api prefix
  console.log('Test routes enabled in development mode');
}

// Error handling middleware with improved logging
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  console.error('Request path:', req.path);
  console.error('Request body:', req.body);
  console.error('Error stack:', err.stack);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    path: req.path,
    method: req.method,
    // Only include stack trace in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at:`);
  console.log(`- http://localhost:${PORT}/api/auth/login/customer`);
  console.log(`- http://localhost:${PORT}/api/auth/login/banker`);
  console.log(`- http://localhost:${PORT}/api/auth/register`);
  console.log(`- http://localhost:${PORT}/auth/login/customer (alternate)`);
  
  try {
    // Test database connection with retries
    let connected = false;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (!connected && attempts < maxAttempts) {
      attempts++;
      try {
        console.log(`Database connection attempt ${attempts}/${maxAttempts}...`);
        await testConnection();
        connected = true;
        console.log('Database connection successful!');
      } catch (connError) {
        console.error(`Connection attempt ${attempts} failed:`, connError.message);
        if (attempts < maxAttempts) {
          console.log('Retrying in 2 seconds...');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }
    
    if (!connected) {
      throw new Error('Failed to connect to database after multiple attempts');
    }
      // Run database update if connection is successful
    try {
      // Only run database updates if needed
      const updateDatabase = require('./config/db.update');
      await updateDatabase();
      
      // Initialize OTP table
      const { createOtpTable } = require('./config/db.otp');
      await createOtpTable();
      
      console.log('Database schema updated successfully');
    } catch (error) {
      console.error('Error updating database schema:', error);
    }
  } catch (error) {
    console.warn('Database connection failed, but server is still running.');
    console.warn('Some features requiring database access will not work.');
    console.error('Connection error details:', error.message);
  }
});
