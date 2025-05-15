# How to run the application

## Setup the backend

1. Navigate to the backend directory
```
cd backend
```

2. Install dependencies
```
npm install
```

3. Create a .env file from the example
```
copy .env.example .env
```

4. Edit the .env file with your MySQL database credentials

5. Initialize the database
```
npm run init-db
```

## Run the application

1. From the project root directory, run both frontend and backend together
```
npm run dev:all
```

2. Access the application in your browser
```
http://localhost:5173
```

## Login credentials for testing

### Customer
- Email: customer@example.com
- Password: password123

### Banker
- Email: banker@example.com
- Password: password123
