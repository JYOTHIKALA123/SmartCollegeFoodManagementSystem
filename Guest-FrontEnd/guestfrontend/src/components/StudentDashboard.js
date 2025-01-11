import React, { useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [mealType, setMealType] = useState("Lunch");
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      return alert('You are not logged in!');
    }

    try {
      const response = await axios.post(
        'https://collegefoodmanagement.onrender.com/api/students/request-food',
        {
          studentName,
          eventDate,
          mealType,
          guestCount,
          specialRequirements
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        setResponseMessage("Request created successfully!");
        setStudentName("");
        setEventDate("");
        setMealType("Lunch");
        setGuestCount(1);
        setSpecialRequirements("");
        setErrorMessage("");  // Reset error message on success
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(`Failed to create request: ${error.response.data.message || 'Unknown error'}`);
        setResponseMessage("");  // Clear success message on error
      } else {
        setErrorMessage("Error in request setup. Please try again.");
        setResponseMessage("");  // Clear success message on error
      }
    }
  };

  const foodItems = {
    Breakfast: [
      { name: 'Idli with Sambar and Chutney', price: '₹50', image: 'idly.jpg' },
      { name: 'Masala Dosa', price: '₹60', image: 'dosa.jpg' },
      { name: 'Sandwich', price: '₹40', image: 'sandwich.jpg' },
      { name: 'Upma', price: '₹30', image: 'upma.jpg' },
    ],
    Lunch: [
      { name: 'Veg Biryani', price: '₹90', image: 'biryani.jpg' },
      { name: 'Chapati with Paneer Butter Masala', price: '₹65', image: 'chapati.jpg' },
      { name: 'Rice, Sambar, and Vegetable Curry', price: '₹45', image: 'rice.jpg' },
      { name: 'Fried Rice with Manchurian', price: '₹95', image: 'fried_rice.jpg' },
      { name: 'Curd Rice', price: '₹70', image: 'curd_rice.jpg' },
    ],
    Dinner: [
      { name: 'Plain Paratha with Mixed Vegetable Curry', price: '₹80', image: 'paratha.jpg' },
      { name: 'Veg Noodles', price: '₹90', image: 'noodles.jpg' },
      { name: 'Pulao with Raita', price: '₹100', image: 'pulao.jpg' },
    ],
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="studentName">Student Name:</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="mealType">Meal Type:</label>
          <select
            id="mealType"
            name="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            required
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="guestCount">Count:</label>
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="specialRequirements">Special Requirements:</label>
          <textarea
            id="specialRequirements"
            name="specialRequirements"
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Submit Request</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <h3>Food Items ({mealType})</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {foodItems[mealType].map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              maxWidth: '200px',
              textAlign: 'center',
            }}
          >
            <img
              src={`images/${item.image}`}
              alt={item.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h4>{item.name}</h4>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
