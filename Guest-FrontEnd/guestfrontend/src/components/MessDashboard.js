import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessDashboard() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('https://collegefoodmanagement.onrender.com/api/mess/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Filter requests to only include those with status 'Approved'
      const approvedRequests = response.data.filter(request => request.status === 'Approved');
      setRequests(approvedRequests); // Update the state with approved requests

    } catch (error) {
      console.error('Error fetching requests:', error.response?.data);
    }
  };

  useEffect(() => {
    fetchRequests(); // Fetch requests on component mount
  }, []);

  const handleStatusChange = async (requestId) => {
    try {
      await axios.post(`https://collegefoodmanagement.onrender.com/api/mess/complete`, { id: requestId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert(`Request marked as Completed`);
      fetchRequests(); // Re-fetch to update the list
    } catch (error) {
      console.error(`Complete error:`, error.response?.data);
    }
  };

  return (
    <div>
      <h2>Mess Dashboard</h2>
      {requests.length === 0 ? (
        <p>No approved requests available.</p>
      ) : (
        requests.map((request) => (
          <div key={request._id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h4>Event Date: {request.eventDate || 'N/A'}</h4>
            <p><strong>Department Name:</strong> {request.departmentName || 'N/A'}</p>
            <p><strong>Student Name:</strong> {request.studentName || 'N/A'}</p> {/* Added studentName field */}
            <p><strong>Meal Type:</strong> {request.mealType || 'N/A'}</p>
            <p><strong>Guest Count:</strong> {request.guestCount || 'N/A'}</p>
            <p><strong>Special Requirements:</strong> {request.specialRequirements || 'None'}</p>
            <p><strong>Status:</strong> {request.status}</p>
            <button onClick={() => handleStatusChange(request._id)}>Mark as Completed</button>
          </div>
        ))
      )}
    </div>
  );
}

export default MessDashboard;
