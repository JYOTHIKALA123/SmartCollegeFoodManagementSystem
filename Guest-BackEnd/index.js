const express = require('express');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
require('dotenv').config();

const cors = require('cors');


const app = express();
app.use(express.json());
connectDB();
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from the React app
    credentials: true,
  }));
  
app.use(bodyParser.json());
app.use('/api/auth', require('./Routes/authRoutes')); // Add auth routes
app.use('/api/dep', require('./Routes/departmentRoutes'));
app.use('/api/office', require('./Routes/officeRoutes'));
app.use('/api/mess', require('./Routes/messRoutes'));
app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
