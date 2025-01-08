// Import Request and SRequest models
const Request = require('../Models/Request');
const SRequest = require('../Models/SRequest');

// Handlers for the Request model
exports.completeRequest = async (req, res) => {
  try {
    const { id } = req.body; // Get request ID from the request body

    // Attempt to update the request in the department model (Request)
    let request = await Request.findByIdAndUpdate(id, { status: 'Completed' }, { new: true });

    // If no request was found in department model, try student model (SRequest)
    if (!request) {
      request = await SRequest.findByIdAndUpdate(id, { status: 'Completed' }, { new: true });
    }

    // If the request was not found in either model, return a 404 error
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Optionally, send a notification logic can go here if needed
    res.json(request);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    // Fetch approved requests from both schemas
    const departmentRequests = await Request.find({ status: 'Approved' });
    const studentRequests = await SRequest.find({ status: 'Approved' });

    // Combine the results into a single array
    const allRequests = [...departmentRequests, ...studentRequests];

    // Ensure you're sending valid JSON
    res.json(allRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCompletedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'Completed' });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
