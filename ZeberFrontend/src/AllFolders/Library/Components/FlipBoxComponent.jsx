import React, { useEffect } from 'react';
import {Link} from "react-router-dom";

const FlipBoxComponent = () => {


  //for performing the auto swipe in smaller screen size(<1025px)
  useEffect(() => {
    const boxContainer = document.querySelector('.box-container');
    const boxItems = boxContainer.querySelectorAll('.box-container .box-item');
    const scrollDelay = 2000; // Time in milliseconds

    // Calculate the scroll amount based on the width and margin of the box items
    const boxItemStyle = window.getComputedStyle(boxItems[0]);
    const scrollAmount = boxItems[0].offsetWidth + parseInt(boxItemStyle.marginRight, 10);

    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        // Check if we have scrolled to the end
        if (boxContainer.scrollLeft + boxContainer.clientWidth >= boxContainer.scrollWidth) {
          boxContainer.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          boxContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          });
        }
      }, scrollDelay);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    // Start auto-scrolling
    startAutoScroll();

    // Stop auto-scrolling on mouse hover
    boxContainer.addEventListener('mouseover', stopAutoScroll);
    boxContainer.addEventListener('mouseout', startAutoScroll);

    // Clean up event listeners and intervals
    return () => {
      stopAutoScroll();
      boxContainer.removeEventListener('mouseover', stopAutoScroll);
      boxContainer.removeEventListener('mouseout', startAutoScroll);
    };
  }, []);


  return (
    <div className="box-container">
      
      {/* First Card */}
      <div
        className={`box-item `}
      >
        <div className="flip-box">
          <div
            className="flip-box-front text-center"
            style={{ backgroundImage: `url('/library/image/VIDEO SUM.png')` }}
          >
            <div className="inner color-white">
              <img src="" alt="" className="flip-box-img" />
            </div>
          </div>
          <div className="flip-box-back text-center">
            <div className="inner color-white">
              <h3 className="flip-box-header">TAP TO WATCH</h3>
              <Link to="/video">  <button className="flip-box-button">
                START
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Second Card */}
      <div
        className={`box-item `}
      >
        <div className="flip-box">
          <div
            className="flip-box-front text-center"
            style={{ backgroundImage: `url('/library/image/listen to Audio summary.png')` }}
          >
            <div className="inner color-white">
              <img src="" alt="" className="flip-box-img" />
            </div>
          </div>
          <div className="flip-box-back text-center">
            <div className="inner color-white">
              <h3 className="flip-box-header">TAP TO LISTEN</h3>
              <Link to="/music">  <button className="flip-box-button">
                START
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Third Card */}
      <div
        className={`box-item `}
      >
        <div className="flip-box">
          <div
            className="flip-box-front text-center"
            style={{ backgroundImage: `url('/library/image/CHALLEN.png')` }}
          >
            <div className="inner color-white">
              <img src="" alt="" className="flip-box-img" />
            </div>
          </div>
          <div className="flip-box-back text-center">
            <div className="inner color-white">
              <h3 className="flip-box-header">TAP TO PLAY</h3>
              <Link to="/audio-book">  <button className="flip-box-button">
                START
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>


      {/* Fourth Card */}
      <div
        className={`box-item `}
      >
        <div className="flip-box">
          <div
            className="flip-box-front text-center"
            style={{ backgroundImage: `url('/library/image/reelsCard.png')` }}
          >
            <div className="inner color-white">
              <img src="" alt="" className="flip-box-img" />
            </div>
          </div>
          <div className="flip-box-back text-center">
            <div className="inner color-white">
              <h3 className="flip-box-header">TAP TO PLAY</h3>
              <Link to="/reels">  <button className="flip-box-button">
                START
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipBoxComponent;
