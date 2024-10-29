// NotFound.jsx
import React from 'react';
import './NotFound.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
