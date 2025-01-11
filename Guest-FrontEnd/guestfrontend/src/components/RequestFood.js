import React, { useState } from 'react';
import axios from 'axios';

const RequestFood = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [mealType, setMealType] = useState('Lunch');
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'https://collegefoodmanagement.onrender.com/api/dep/request-food',
        {
          departmentName,
          eventDate,
          mealType,
          guestCount,
          specialRequirements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Food request submitted successfully');
        setResponseMessage('Thank you! Your food request has been submitted successfully.');
      } else {
        alert('Submission failed: ' + response.data.message);
        setResponseMessage('Failed to submit food request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request');
      setResponseMessage('Error submitting request. Please try again.');
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
    <div>
      {/* Inline Style using <style> */}
      <style>
        {`
          .container {
            display: flex;
            flex-direction: row;
            margin: 20px;
            gap: 20px;
          }

          .form-container {
            flex: 1;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .form-container h2 {
            margin-bottom: 20px;
          }

          .form-container form {
            display: flex;
            flex-direction: column;
          }

          .form-container input,
          .form-container select,
          .form-container textarea,
          .form-container button {
            margin-bottom: 15px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
          }

          .form-container button {
            background: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
          }

          .form-container button:hover {
            background: #45a049;
          }

          .food-container {
            flex: 2;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .food-container h3 {
            margin-bottom: 10px;
          }

          .food-items {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }

          .food-item {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            max-width: 200px;
            text-align: center;
          }

          .food-item img {
            width: 100%;
            border-radius: 8px;
          }
        `}
      </style>

      <div className="container">
        {/* Form Section */}
        <div className="form-container">
          <h2>Request Food</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
            <select value={mealType} onChange={(e) => setMealType(e.target.value)} required>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
            <input
              type="number"
              placeholder="Guest Count"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              min="1"
              required
            />
            <textarea
              placeholder="Special Requirements"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
            />
            <button type="submit">Submit Request</button>
          </form>

          {/* Response Message */}
          {responseMessage && <p>{responseMessage}</p>}
        </div>

        {/* Food Items Section */}
        <div className="food-container">
          <h3>Food Items ({mealType})</h3>
          <div className="food-items">
            {foodItems[mealType].map((item, index) => (
              <div key={index} className="food-item">
                <img
                  src={`images/${item.image}`}
                  alt={item.name}
                />
                <h4>{item.name}</h4>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFood;
