import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create .env.production for Vercel deployments
console.log('Setting up environment for Vercel deployment...');

const envContent = 
`# Production environment variables - Generated for Vercel
VITE_API_BASE_URL=${process.env.VITE_API_BASE_URL || 'https://banking-system-production-99a6.up.railway.app/api'}
VITE_MODE=production
VITE_APP_TITLE=Modern Banking System
VITE_SITE_URL=${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}`;

fs.writeFileSync(path.join(__dirname, '.env.production'), envContent);
console.log('.env.production created successfully for Vercel deployment!');
