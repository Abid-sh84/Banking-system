# Banking System Backend

This is the backend for the Banking System application, built with Node.js and MySQL.

## Prerequisites

- Node.js
- MySQL

## Setup

1. Make sure MySQL is running on your machine
2. Make sure the `.env` file in the project root has the correct database configuration:

```
PORT=5000
JWT_SECRET=your_jwt_secret

# Database Configuration (For MySQL)
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=bank
DB_PORT=3306
```

3. Install dependencies:

```bash
npm install
```

4. Initialize the database:

```bash
npm run init-db
```

This will create the required tables and default users:
- Admin: admin@bank.com / admin123
- Test Customer: customer@example.com / customer123

5. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new customer
- `POST /api/auth/login/customer` - Customer login
- `POST /api/auth/login/banker` - Banker login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Customer

- `GET /api/customers/profile` - Get customer profile
- `PUT /api/customers/profile` - Update customer profile
- `POST /api/customers/change-password` - Change password
- `GET /api/customers/transactions` - Get customer transactions
- `GET /api/customers/transactions/:id` - Get customer transaction by ID
- `POST /api/customers/transactions` - Create a new transaction

### Banker

- `GET /api/banker/profile` - Get banker profile
- `POST /api/banker/change-password` - Change password
- `GET /api/banker/customers` - Get all customers
- `GET /api/banker/customers/:id` - Get customer by ID
- `GET /api/banker/customers/:id/transactions` - Get customer transactions
- `GET /api/banker/transactions` - Get all transactions
- `POST /api/banker/create` - Create a new banker (admin only)

### Transactions

- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create a new transaction (banker only)

## Features

- JWT Authentication and Authorization
- Role-based access control (Customer, Banker, Admin)
- Transaction management with proper validation
- Account balance management
- Error handling with proper status codes
- MySQL database with transactions for data integrity
