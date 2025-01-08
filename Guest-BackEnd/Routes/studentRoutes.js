const express = require("express");
const { createRequest, getRequests } = require("../Controllers/studentController");  // Correct path
const authMiddleware = require("../Middlewares/authMiddleware");  // Correct path

const router = express.Router();

// Route to fetch all requests for the logged-in student
router.get("/requests", authMiddleware(['Student']), getRequests);

// Route to create a new food request
router.post("/request-food", authMiddleware(['Student']), createRequest);

module.exports = router;
