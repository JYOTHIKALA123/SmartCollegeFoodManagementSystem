import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      if (response.data.success) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Navigate based on user role
        const { role } = response.data; // Assuming role is included in the response
        if (role === 'Department') {
          navigate('/request-food'); // Redirect to Request Food page
        } else if (role === 'Office') {
          navigate('/office-dashboard'); // Redirect to Office Dashboard
        } else if (role === 'Mess') {
          navigate('/mess-dashboard'); // Redirect to Mess Dashboard
        } else if (role === 'Student') {
          navigate('/StudentDashboard'); // Redirect to Student Dashboard
        } else {
          alert('Invalid role');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Make this field required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Make this field required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
