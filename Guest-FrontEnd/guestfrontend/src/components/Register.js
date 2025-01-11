import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Department'); // default role is Department
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
        role,
      });

      // Check if the response indicates success
      if (response.data.success) {
        alert('Registration successful');
        navigate('/login'); // Navigate to login on success
      } else {
        alert('Registration failed: ' + response.data.error); // Handle registration failure
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration error: ' + (error.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Department">Department</option>
          <option value="Office">Office</option>
          <option value="Mess">Mess</option>
          <option value="Student">Student</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
