const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  departmentName: { type: String, required: true }, 
  eventDate: { type: Date, required: true },
  mealType: { type: String, enum: ["Breakfast", "Lunch", "Dinner"], required: true },
  guestCount: { type: Number, required: true },
  specialRequirements: String,
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "In Preparation", "Completed"], default: "Pending" }
  // Note: userId and departmentId fields are removed from here
});

// Create the Request model
const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
