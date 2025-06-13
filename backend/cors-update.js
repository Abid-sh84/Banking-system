// This is a reference file showing the updated CORS configuration you should add to your server.js

// Update the CORS configuration in your server.js file
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:8080',
    process.env.FRONTEND_URL ||
    'https://banking-system-iota-khaki.vercel.app',  // Your specific vercel domain
    /\.vercel\.app$/  // This regex allows all vercel.app subdomains
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Note: After updating this configuration, redeploy your backend to Render
