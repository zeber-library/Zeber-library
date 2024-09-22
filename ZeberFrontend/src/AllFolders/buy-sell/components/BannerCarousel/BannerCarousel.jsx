import React from 'react';
import { Carousel } from 'react-bootstrap';
import './BannerCarousel.css'; 
import image from '../../assests/image.png';

const BannerCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="banner">
          <div className="banner-text">
            <h2>Find sellers with shop discounts</h2>
            <p>Save even more with these sellers who offer free shipping and other discounts.</p>
            <button className="view-button">View bookshops</button>
          </div>
          <div className="banner-image">
            <img
              src={image}
              alt="Banner"
            />
          </div>
        </div>
      </Carousel.Item>
      
      <Carousel.Item>
        <div className="banner">
          <div className="banner-text">
            <h2>Discover Amazing Deals</h2>
            <p>Find the best prices on books from trusted sellers.</p>
            <button className="view-button">Shop Now</button>
          </div>
          <div className="banner-image">
            <img
              src={image}
              alt="Banner"
            />
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="banner">
          <div className="banner-text">
            <h2>Discover Amazing Deals</h2>
            <p>Find the best prices on books from trusted sellers.</p>
            <button className="view-button">Shop Now</button>
          </div>
          <div className="banner-image">
            <img
              src={image}
              alt="Banner"
            />
          </div>
        </div>
      </Carousel.Item>
      
    </Carousel>
  );
};

export default BannerCarousel;
