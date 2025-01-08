const Request = require('../Models/Request');
const SRequest = require('../Models/SRequest');

// Approve a food request
exports.approveRequest = async (req, res) => {
  try {
    const { departmentName, eventDate, mealType } = req.body;

    const request = await Request.findOneAndUpdate(
      { departmentName, eventDate, mealType, status: 'Pending' },
      { status: 'Approved' },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve the request', error: error.message });
  }
};

// Get all pending requests
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'Pending' });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending requests', error: error.message });
  }
};

// Get all completed requests (from both department and student)
exports.getCompletedRequests = async (req, res) => {
  try {
    // Fetch completed department requests
    const departmentCompleted = await Request.find({ status: 'Completed' });

    // Fetch completed student requests
    const studentCompleted = await SRequest.find({ status: 'Completed' });

    // Combine the results into a single array
    const completedRequests = [...departmentCompleted, ...studentCompleted];

    res.status(200).json(completedRequests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch completed requests', error: error.message });
  }
};

// Delete a completed food request after payment
exports.deleteCompletedRequest = async (req, res) => {
  try {
    const { departmentName, studentName, eventDate, mealType } = req.body;

    // Log incoming request
    console.log("Incoming request body:", req.body);

    let deletedRequest = null;

    if (departmentName) {
      console.log("Attempting to delete a department request...");
      deletedRequest = await Request.findOneAndDelete({
        departmentName,
        eventDate: new Date(eventDate),
        mealType,
        status: "Completed",
      });

      if (deletedRequest) {
        console.log("Deleted department request:", deletedRequest);
        return res.status(200).json({ message: "Department request deleted successfully" });
      }
    }

    if (studentName) {
      console.log("Attempting to delete a student request...");
      deletedRequest = await SRequest.findOneAndDelete({
        studentName,
        eventDate: new Date(eventDate),
        mealType,
        status: "Completed",
      });

      if (deletedRequest) {
        console.log("Deleted student request:", deletedRequest);
        return res.status(200).json({ message: "Student request deleted successfully" });
      }
    }

    console.error("Request not found for deletion:", req.body);
    return res.status(404).json({ message: "Request not found. Please ensure all fields are correct." });
  } catch (error) {
    console.error("Error deleting request:", error.message);
    return res.status(500).json({ message: "Failed to delete the request", error: error.message });
  }
};



