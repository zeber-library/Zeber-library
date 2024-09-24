import React from 'react';
import './Banner.css';
import image from '../../../assets/image.png';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-text">
        <h2>Find sellers with shop discounts</h2>
        <p>Save even more with these sellers who offer free shipping and other discounts.</p>
        <button className="view-button">View bookshops</button>
      </div>
      <div className="banner-image">
        <img src={image} alt="Banner" />
      </div>
    </div>
  );
};

export default Banner;
