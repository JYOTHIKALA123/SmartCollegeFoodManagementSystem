import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Home.css';
 


function Home() {
  return (
    <div className="outer-container">
      <div className="inner-container">
        <h1>Welcome to College Guest Food Arrangements</h1>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Home;
