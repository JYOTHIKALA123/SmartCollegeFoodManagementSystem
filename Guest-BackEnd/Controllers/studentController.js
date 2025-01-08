const Request = require("../Models/SRequest");

const createRequest = async (req, res) => {
  try {
    console.log("Decoded JWT user:", req.user); // Log user data from JWT

    // Check if the studentName is provided in the body
    const { studentName, eventDate, mealType, guestCount, specialRequirements } = req.body;

    if (!studentName) {
      return res.status(400).json({ message: "Student name is required." });
    }

    // Extract and validate required fields from the request body
    if (!eventDate || !mealType || !guestCount) {
      return res.status(400).json({ message: "All required fields (eventDate, mealType, guestCount) must be provided." });
    }

    // Prepare the request data
    const requestData = {
      studentName, // Use the studentName from the request body
      eventDate,
      mealType,
      guestCount,
      specialRequirements,
    };

    // Create a new request document
    const newRequest = new Request(requestData);

    // Save the new request to the database
    await newRequest.save();
    res.status(201).json({ message: "Request created successfully." });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ message: "Failed to create request." });
  }
};

const getRequests = async (req, res) => {
  try {
    // Fetch all requests, sorted by creation date
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Failed to fetch requests." });
  }
};
module.exports = {
  createRequest,
  getRequests,
};
