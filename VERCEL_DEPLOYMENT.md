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
     - `JWT_SECRET`: Your JWT secret key
     - `DB_HOST`: Your database host
     - `DB_USER`: Your database username 
     - `DB_PASSWORD`: Your database password
     - `DB_NAME`: Your database name (default: `bank`)
     - `DB_PORT`: Your database port (usually `3306`)
     - `FRONTEND_URL`: Frontend app URL (after deployment)

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

## Maintenance and Updates

1. **Database Migrations**: Run any required migrations manually
2. **Redeployment**: Vercel will automatically redeploy on code changes to the main branch
3. **Rollbacks**: Use Vercel's dashboard to roll back to previous deployments if needed