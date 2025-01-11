const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000'], // Add both origins if needed
    credentials: true, // Allow cookies and authentication headers
}));

// Routes
app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/dep', require('./Routes/departmentRoutes'));
app.use('/api/office', require('./Routes/officeRoutes'));
app.use('/api/mess', require('./Routes/messRoutes'));
app.use('/api/students', require('./Routes/studentRoutes'));

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
