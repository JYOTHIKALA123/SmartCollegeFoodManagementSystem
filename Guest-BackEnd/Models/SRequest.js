const mongoose = require('mongoose');

// Define the SRequest schema without the departmentName field
const sRequestSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true }, // The student's name submitting the request
    eventDate: { type: Date, required: true }, // The date of the event
    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
      required: true,
    }, // The type of meal requested
    guestCount: { type: Number, required: true }, // Number of guests
    specialRequirements: { type: String }, // Any special requirements for the meal
    status: {
      type: String,
      enum: ["Approved", "Completed"], // Only "Approved" and "Completed" statuses are allowed
      default: "Approved", // Default status is "Approved"
    }, // Status of the request
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the SRequest model
const SRequest = mongoose.model("SRequest", sRequestSchema);

module.exports = SRequest;
