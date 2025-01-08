import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OfficeDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [loading, setLoading] = useState(false); // To handle loading state
  const [alertMessage, setAlertMessage] = useState(''); // To manage alert message

  useEffect(() => {
    fetchPendingRequests();
    fetchCompletedRequests();
  }, []);

  // Function to fetch pending requests
  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/office/pending', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPendingRequests(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching pending requests:', error.response || error);
      setAlertMessage('Failed to fetch pending requests. Please try again.');
    }
  };

  // Function to fetch completed requests (both department and student)
  const fetchCompletedRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/office/completed', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCompletedRequests(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching completed requests:', error.response || error);
      setAlertMessage('Failed to fetch completed requests. Please try again.');
    }
  };

  // Function to handle approval
  const handleApprove = async (request) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:5000/api/office/approve`,
        {
          departmentName: request.departmentName,
          eventDate: request.eventDate,
          mealType: request.mealType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchPendingRequests(); // Refresh pending requests
      setAlertMessage('Request approved successfully!');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error approving request:', error.response || error);
      setAlertMessage('Failed to approve the request. Please try again.');
    }
  };

  // Function to handle deleting the completed request without payment
  const handleDelete = async (request) => {
    try {
      setLoading(true);
      // Make sure the request contains the necessary fields
      const dataToDelete = {
        departmentName: request.departmentName || '', // Handle either department or student
        studentName: request.studentName || '', // If it's a student request
        eventDate: request.eventDate,
        mealType: request.mealType,
      };
  
      // Send delete request
      await axios.delete('http://localhost:5000/api/office/deleteCompletedRequest', {
        data: dataToDelete,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      setAlertMessage('Request deleted successfully');
      fetchCompletedRequests(); // Refresh completed requests
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error deleting request:', error.response || error);
      setAlertMessage('Failed to delete the request. Please try again.');
    }
  };
  

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Render the alert message if it exists */}
      {alertMessage && <div className="alert">{alertMessage}</div>}

      <h1>Pending Food Requests</h1>
      {pendingRequests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Event Date</th>
              <th>Meal Type</th>
              <th>Guest Count</th>
              <th>Special Requirements</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr key={`${request.departmentName}-${request.eventDate}-${request.mealType}`}>
                <td>{request.departmentName}</td>
                <td>{new Date(request.eventDate).toLocaleDateString()}</td>
                <td>{request.mealType}</td>
                <td>{request.guestCount}</td>
                <td>{request.specialRequirements || 'None'}</td>
                <td>
                  <button
                    onClick={() => handleApprove(request)}
                    disabled={request.status === 'Approved'}
                  >
                    {request.status === 'Approved' ? 'Approved' : 'Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h1>Completed Food Requests</h1>
      {completedRequests.length === 0 ? (
        <p>No completed requests</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Department</th>
              <th>Event Date</th>
              <th>Meal Type</th>
              <th>Guest Count</th>
              <th>Special Requirements</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedRequests.map((request) => (
              <tr key={`${request.departmentName}-${request.eventDate}-${request.mealType}`}>
                <td>{request.departmentName ? 'Department' : 'Student'}</td>
                <td>{request.departmentName ? request.departmentName : request.studentName}</td>
                <td>{new Date(request.eventDate).toLocaleDateString()}</td>
                <td>{request.mealType}</td>
                <td>{request.guestCount}</td>
                <td>{request.specialRequirements || 'None'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(request)} // Directly delete the completed request
                  >
                    Payed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OfficeDashboard;
