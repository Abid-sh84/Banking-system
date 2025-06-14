# Banking System (Modern Bank India)

A full-stack banking application with customer and banker portals, virtual card management, transaction processing, deposit handling, and chatbot functionality.

![version](https://img.shields.io/badge/version-1.0.0-blue) ![license](https://img.shields.io/badge/license-MIT-green) ![last-commit](https://img.shields.io/badge/last%20commit-June%202025-brightgreen)

[![Built with](https://img.shields.io/badge/Built%20with-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Frontend](https://img.shields.io/badge/Frontend-Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Backend](https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Frontend Deploy](https://img.shields.io/badge/Frontend%20Deployed%20with-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Backend Deploy](https://img.shields.io/badge/Backend%20Deployed%20with-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

## ✨ Features

- **Dual Portal System**
  - Customer portal for account management and transactions
  - Banker dashboard for customer management and oversight
  
- **Financial Management**
  - Transaction processing and approval workflow
  - Virtual card creation and management
  - Deposit handling and tracking

- **Security**
  - JWT-based authentication
  - OTP verification
  - Role-based access control

- **Additional Features**
  - 💬 Integrated ChatBot for customer assistance
  - 📊 CIBIL score assessment
  - ⏱️ Activity timeline and transaction history
  - 📈 Performance metrics and analytics

## 💻 Tech Stack Details

<div align="center">
  
### Frontend Technologies
![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### Backend Technologies
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

### Development & Deployment Tools
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

</div>

## 🚥 Development Status

<table>
  <tr>
    <th>Module</th>
    <th>Status</th>
    <th>Progress</th>
  </tr>  <tr>
    <td>Customer Portal</td>
    <td>✅ Complete</td>
    <td>
      <img src="https://img.shields.io/badge/100%25-brightgreen?style=flat-square&logo=checkmarx&logoColor=white&label=completed" alt="100%" />
    </td>
  </tr>
  <tr>
    <td>Banker Dashboard</td>
    <td>✅ Complete</td>
    <td>
      <img src="https://img.shields.io/badge/100%25-brightgreen?style=flat-square&logo=checkmarx&logoColor=white&label=completed" alt="100%" />
    </td>
  </tr>
  <tr>
    <td>Virtual Card Management</td>
    <td>✅ Complete</td>
    <td>
      <img src="https://img.shields.io/badge/100%25-brightgreen?style=flat-square&logo=checkmarx&logoColor=white&label=completed" alt="100%" />
    </td>
  </tr>
  <tr>
    <td>Transaction Processing</td>
    <td>✅ Complete</td>
    <td>
      <img src="https://img.shields.io/badge/100%25-brightgreen?style=flat-square&logo=checkmarx&logoColor=white&label=completed" alt="100%" />
    </td>
  </tr>
  <tr>
    <td>ChatBot</td>
    <td>✅ Complete</td>
    <td>
      <img src="https://img.shields.io/badge/100%25-brightgreen?style=flat-square&logo=checkmarx&logoColor=white&label=completed" alt="100%" />
    </td>
  </tr>
</table>

## 🛠️ Tech Stack

### Frontend
- Vue.js 
- TailwindCSS
- Vite (Build tool)

### Backend
- Node.js
- Express.js
- PostgreSQL database

## 📁 Project Structure

```
├── backend/                  # Backend Node.js/Express application
│   ├── scripts/              # Additional backend scripts
│   ├── src/                  # Main source code
│   │   ├── config/           # Database and configuration 
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Authentication and validation middleware
│   │   ├── models/           # Data models
│   │   ├── routes/           # API routes
│   │   ├── scripts/          # Additional scripts
│   │   └── utils/            # Utility functions
│   └── uploads/              # Upload directory
│
├── frontend/                 # Vue.js frontend application
│   ├── public/               # Static assets
│   └── src/                  # Frontend source code
│       ├── components/       # Vue components
│       ├── contexts/         # React/Vue contexts
│       ├── directives/       # Vue directives
│       ├── pages/            # Application pages
│       ├── router/           # Vue Router configuration
│       ├── services/         # API services
│       ├── stores/           # State management
│       └── utils/            # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abid-sh84/Banking-system.git
   cd banking-system
   ```

2. **Set up backend**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   # Create a .env file with necessary configuration
   
   # Run database migrations
   node run_migrations.js
   
   # Start the server
   npm start
   ```

3. **Set up frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173 (or port configured in vite.config.js)
   - Backend API: http://localhost:5000 (or port configured in server.js)

## 💻 Usage

### Customer Portal
- Account overview and management
- Transaction initiation and history
- Virtual card management
- Deposit creation and tracking

### Banker Portal
- Customer account management
- Transaction approval and monitoring
- Performance metrics and analytics
- Report generation and export

## 📋 API Documentation

The API provides endpoints for:
- Authentication and user management
- Transaction processing
- Card operations
- Deposit handling
- Customer information
- Chatbot interactions

## 📊 Live Demo

[![Frontend Demo](https://img.shields.io/badge/Frontend%20Demo-Visit%20Website-blueviolet?style=for-the-badge)](https://banking-system-iota-khaki.vercel.app/)


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

<div align="center">
  
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:muhammadabid9326@gmail.com)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/AbidShaikh550)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shkabid40/)

</div>


