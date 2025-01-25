const express = require("express");
const connectDB = require("./Config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'https://smart-client.vercel.app/login', credentials: true }));

// Connect to MongoDB
connectDB();

// Enable CORS for React frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your deployed frontend URL if needed
    credentials: true,
  })
);

// Routes
app.use("/api/auth", require("./Routes/authRoutes")); // Authentication routes
app.use("/api/dep", require("./Routes/departmentRoutes")); // Department routes
app.use("/api/office", require("./Routes/officeRoutes")); // Office routes
app.use("/api/mess", require("./Routes/messRoutes")); // Mess routes

// Root route (health check)
app.get("/", (req, res) => {
  try {
    res.json({ message: "API is working!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
