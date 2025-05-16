# Vercel Deployment Guide

This document outlines how to deploy this banking system application on Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Git repository for this project
3. MySQL database (can use PlanetScale, AWS RDS, or any other MySQL provider)
4. Vercel CLI (optional, for local testing)

## Deployment Strategy

This project uses a monorepo structure with separate deployments for frontend and backend:

1. **Backend API**: Deployed as a serverless Node.js application
2. **Frontend**: Deployed as a static site built with Vite/Vue

## Backend Deployment

1. **Set up environment variables on Vercel:**
   - Go to your project settings in Vercel dashboard
   - Add the following environment variables:
     - `NODE_ENV`: Set to `production`
     - `JWT_SECRET`: Your JWT secret key (e.g., `e1f4cf15351809c2e2d5b22016ee8be8224bcc104b4150b4b1d0e507f6b697c9`)
     - `DB_HOST`: Your database host (e.g., `sql10.freesqldatabase.com`)
     - `DB_USER`: Your database username (e.g., `sql10778941`)
     - `DB_PASSWORD`: Your database password 
     - `DB_NAME`: Your database name (e.g., `sql10778941`)
     - `DB_PORT`: Your database port (usually `3306`)
     - `FRONTEND_URL`: Frontend app URL (after deployment)

   > **Important**: There are two ways to set environment variables in Vercel:
   >
   > **Method 1: Direct Environment Variables (Recommended for this project)**
   > - In the Vercel project settings, go to the "Environment Variables" tab
   > - Add each variable with its name and value directly
   > - These values will be encrypted and securely stored by Vercel
   >
   > **Method 2: Using Vercel Secrets**
   > - If your vercel.json has values like `"JWT_SECRET": "@jwt_secret"`, you need to create these secrets
   > - Run `vercel secrets add jwt_secret "your-secret-value"` for each secret
   > - You must create all referenced secrets before deployment
   >
   > **Troubleshooting**: If you see errors like "Environment Variable 'JWT_SECRET' references Secret 'jwt_secret', which does not exist", 
   > either create the missing secrets using the Vercel CLI or update vercel.json to use direct environment variables.

2. **Deploy Backend:**
   - In Vercel dashboard, choose "Add New" → "Project"
   - Import your Git repository
   - Configure the project:
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Output Directory: (leave empty)
     - Install Command: `npm install`
   - Environment Variables: Set as above
   - Click "Deploy"

3. **Note your backend URL** for frontend configuration (e.g., `https://banking-system-backend.vercel.app`)

## Frontend Deployment

1. **Set up environment variables on Vercel:**
   - Add the following environment variable:
     - `VITE_API_BASE_URL`: Your backend URL + `/api` (e.g., `https://banking-system-backend.vercel.app/api`)
     - `VITE_MODE`: Set to `production`
     - `VITE_APP_TITLE`: Your app name

2. **Deploy Frontend:**
   - In Vercel dashboard, choose "Add New" → "Project"
   - Import your Git repository
   - Configure the project:
     - Root Directory: `frontend`
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
   - Environment Variables: Set as above
   - Click "Deploy"

## Alternative: Monorepo Single Deployment

If you prefer to deploy just the frontend and point to the separately deployed backend:

1. Deploy the backend as described above
2. In your root vercel.json, update the `rewrites` array to point to your actual backend URL:
   ```json
   "rewrites": [
     {
       "source": "/api/:path*",
       "destination": "https://your-backend-url.vercel.app/api/:path*"
     }
   ]
   ```
3. Deploy the root directory pointing to the frontend build

## Database Setup

After deployment, initialize your database:

1. Connect to your MySQL database service
2. Set up your database connection in Vercel environment variables
3. Run the DB initialization script:
   ```
   node backend/src/config/db.init.js
   ```

## CORS Configuration

The backend is configured to accept requests from:
- Local development servers
- The production frontend URL
- All Vercel app domains

If you need to add more domains, update the CORS configuration in `backend/src/server.js`.

## Post-Deployment Verification

1. Visit your frontend URL and ensure it loads properly
2. Test customer registration and login
3. Test banker login (with admin123 password)
4. Verify that API calls are working correctly
5. Check database connections and data persistence

## Common Issues and Troubleshooting

- **CORS Issues**: If you see CORS errors, check that your backend allows requests from your frontend domain
- **Database Connection**: Make sure your database is accessible from Vercel's servers
- **Environment Variables**: Verify all required environment variables are set correctly
- **Build Failures**: Check your build logs in Vercel for specific errors

### Environment Variable Secret References Error

If you encounter errors like:
```
Error: Environment Variable "JWT_SECRET" references Secret "jwt_secret", which does not exist.
```
or 
```
Error: Environment Variable "VITE_API_BASE_URL" references Secret "vite_api_base_url", which does not exist.
```

This means your vercel.json file is trying to use Vercel Secrets, but they haven't been created yet. You have two options:

**Option 1: Create the missing secrets**
```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Login to your Vercel account
vercel login

# For backend secrets:
vercel secrets add jwt_secret "your-jwt-secret-value"
vercel secrets add db_host "your-db-host"
vercel secrets add db_user "your-db-username"
vercel secrets add db_password "your-db-password"
vercel secrets add db_name "your-db-name"
vercel secrets add db_port "3306"
vercel secrets add frontend_url "https://your-frontend-url.vercel.app"

# For frontend secrets:
vercel secrets add vite_api_base_url "https://your-backend-url.vercel.app/api"
vercel secrets add vite_site_url "https://your-frontend-url.vercel.app"
```
vercel secrets add db_user "your-db-username"
vercel secrets add db_password "your-db-password"
vercel secrets add db_name "your-db-name"
vercel secrets add db_port "3306"
vercel secrets add frontend_url "https://your-frontend-url.vercel.app"
```

**Option 2: Update vercel.json to use direct environment variables**

Edit your backend/vercel.json file and change:
```json
"env": {
  "JWT_SECRET": "@jwt_secret",
  "DB_HOST": "@db_host",
  ...
}
```

To:
```json
"env": {
  "JWT_SECRET": "your-jwt-secret-value",
  "DB_HOST": "your-db-host",
  ...
}
```

For frontend deployment, edit your frontend/vercel.json file and change:
```json
"env": {
  "VITE_API_BASE_URL": "@vite_api_base_url",
  ...
}
```

To:
```json
"env": {
  "VITE_API_BASE_URL": "https://your-backend-url.vercel.app/api",
  ...
}
```

Then redeploy your project.

## Maintenance and Updates

1. **Database Migrations**: Run any required migrations manually
2. **Redeployment**: Vercel will automatically redeploy on code changes to the main branch
3. **Rollbacks**: Use Vercel's dashboard to roll back to previous deployments if needed