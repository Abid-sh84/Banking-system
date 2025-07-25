import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Running pre-build checks and setup...');

// Ensure we have a .env file for production
if (!fs.existsSync(path.join(__dirname, '.env.production'))) {
  console.log('Creating .env.production from environment variables...');
  const envContent = 
`# Production environment variables
VITE_API_BASE_URL=${process.env.VITE_API_BASE_URL || 'https://banking-system-d91m.onrender.com'}
VITE_MODE=production
VITE_APP_TITLE=Modern Banking System
VITE_SITE_URL=${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : ''}`;

  fs.writeFileSync(path.join(__dirname, '.env.production'), envContent);
  console.log('.env.production created successfully!');
} else {
  console.log('Using existing .env.production file');
  // Update the SITE_URL with VERCEL_URL if we're in Vercel
  if (process.env.VERCEL_URL) {
    const envFile = fs.readFileSync(path.join(__dirname, '.env.production'), 'utf8');
    const updatedEnv = envFile.replace(/VITE_SITE_URL=.*/, `VITE_SITE_URL=https://${process.env.VERCEL_URL}`);
    fs.writeFileSync(path.join(__dirname, '.env.production'), updatedEnv);
    console.log(`Updated VITE_SITE_URL to https://${process.env.VERCEL_URL}`);
  }
}

// Run the build
try {
  console.log('Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Post-build operations
console.log('Running post-build operations...');

// Create a _redirects file for SPA routing
const redirectsContent = '/* /index.html 200';
fs.writeFileSync(path.join(__dirname, 'dist', '_redirects'), redirectsContent);
console.log('Created _redirects file for SPA routing');

// Create a robots.txt if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'dist', 'robots.txt'))) {  const robotsContent = 
`User-agent: *
Allow: /

Sitemap: ${process.env.VITE_SITE_URL}/sitemap.xml`;
  
  fs.writeFileSync(path.join(__dirname, 'dist', 'robots.txt'), robotsContent);
  console.log('Created robots.txt file');
}
// connection message
console.log('All build operations completed successfully!');
