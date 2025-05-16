# Modern Banking System

A full-stack banking application with separate customer and banker interfaces, built with Node.js/Express backend and Vue.js frontend.

## Project Structure

This is a monorepo containing:

- **Backend**: Node.js/Express REST API with MySQL database
- **Frontend**: Vue.js single-page application with Vite

## Features

- **Customer Portal**:
  - Account registration and management
  - Transaction history and balance view
  - Fund transfers and deposits
  - Profile management

- **Banker Portal**:
  - Customer account management 
  - Transaction monitoring
  - Deposit processing
  - Administrative tools

## Local Development

### Prerequisites

- Node.js (v16+)
- MySQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Set up your database configuration in the `.env` file

5. Initialize the database:
   ```
   npm run init-db
   ```

6. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Access the application at `http://localhost:5173`

## Deployment

This project is configured for deployment on Vercel. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

## License

[MIT](LICENSE)