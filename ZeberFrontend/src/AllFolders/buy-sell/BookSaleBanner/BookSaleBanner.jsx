import React from 'react';
import './BookSaleBanner.css'

function BookSaleBanner() {
  return (
    <div className="banner2">
      <div className="banner-content">
        <div className="banner-content-text">
        <h2>Pango sellers having sales!</h2>
        <p>Save big on your next book haul. Explore Pango bookshops with free shipping and special discount offers here!</p>
        </div>
        <button className="shop-now-button">Shop Now</button>
      </div>

      <div className="browse-by-hashtag">
        <h3>Browse by hashtag</h3>
        <ul className="hashtag-list">
          <li>#signed</li>
          <li>#kids</li>
          <li>#booktok</li>
          <li>#horror</li>
          <li>#ig</li>
          <li>#ya</li>
          <li>#fantasy</li>
          <li>#botm</li>
          <li>#historicalromance</li>
          <li>#history</li>
          <li>#colleenhoover</li>
          <li>#fairyloot</li>
          <li>#manga</li>
          <li>#lgbt</li>
          <li>#newrelease</li>
          <li>#classics</li>
          <li>#middlegrade</li>
          <li>#poetry</li>
          <li>#agathachristie</li>
        </ul>
      </div>
    </div>
  );
}

export default BookSaleBanner;