const Request = require('../Models/Request');

// Create a new food request
// Create a new food request
exports.createRequest = async (req, res) => {
  try {
    const { departmentName, eventDate, mealType, guestCount, specialRequirements } = req.body;

    const request = new Request({
      departmentName,
      eventDate,
      mealType,
      guestCount,
      specialRequirements,
      // Note: userId and departmentId are removed from here
    });

    await request.save();
   
    res.status(201).json({ success: true, request });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all requests for a department
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find({ departmentName: req.user.departmentName }); // Query by department name
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

