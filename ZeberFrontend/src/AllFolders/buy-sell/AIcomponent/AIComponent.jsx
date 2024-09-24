import React from 'react';
import './AIComponent.css';
import logo from '../../../assets/logo.png'

const AIComponent = () => {
  return (
    <div className="ai-component">
      <img src={logo} alt="Pango AI" className="ai-icon" />
      <div className="ai-text">
        <h3>Pango AI</h3>
        <p>Your personal Pangolin book shopper is here to help you find the perfect book!</p>
      </div>
      <button className="ai-chat-button">Chat with Pango</button>
    </div>
  );
};

export default AIComponent;
