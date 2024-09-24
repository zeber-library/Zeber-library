import React, { useRef } from "react";
import BookCard from "./BookCard";
import SwiperComponent from './SwiperComponent';


//Array of books
//this array will come from backend -- to be handle dynamically 
const bookImages = [
  { image: "/library/image/book_343.jpg" },
  { image: "/library/image/book_342.jpg" },
  { image: "/library/image/book_341.jpg" },
  { image: "/library/image/book_23.jpg" },
  { image: "/library/image/book_3.jpg" },
  { image: "/library/image/book_2.jpg" },
  { image: "/library/image/book_4.jpg" },
  { image: "/library/image/book_1.jpg" },
  { image: "/library/image/book_9.jpg" },
];

//component 
const BookSlider = ({ handleBookSelect }) => {

  //ref for all the book container for sliding 
  const trendingSliderRef = useRef(null);
  const recentSliderRef = useRef(null);
  const beginnersSliderRef = useRef(null);
  const intermediateSliderRef = useRef(null);
  const advanceSliderRef = useRef(null);

  //function to handle the arrows right and left 
  const handleArrowClicks = (sliderRef, direction) => {
    const slider = sliderRef.current;
    const slideWidth = slider.querySelector('.slide').offsetWidth + 25;

    if (direction === 'left') {
      if (slider.scrollLeft === 0) {
        slider.scrollTo({
          left: slider.scrollWidth - slider.clientWidth,
          behavior: 'smooth'
        });
      } else {
        slider.scrollBy({
          left: -slideWidth,
          behavior: 'smooth'
        });
      }
    } else if (direction === 'right') {
      if (Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth) {
        slider.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        slider.scrollBy({
          left: slideWidth,
          behavior: 'smooth'
        });
      }
    }
  };


  //return statement 
  return (
    <>
      {/* Trending Book Slider */}
      <div className="BookContainer trending">
        <div className="TrendingBooks Books">
          <button className="arrow-left" onClick={() => handleArrowClicks(trendingSliderRef, 'left')}>
            <i className="fa fa-chevron-left"></i>
          </button>
          <div className="headingBooks">
            <h3>Trending Books</h3>
            <div className="ReadMore">
              <a href="#">
                <span>
                  Read More <i className="fa fa-chevron-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div className="slider" ref={trendingSliderRef}>
            {/*loop for each book type  */}
            {bookImages.map((book, index) => (
              //Book Component 
              <BookCard
                key={index}
                book={book}
                handleBookSelect={handleBookSelect}
                trending
              />
            ))}
          </div>
          <button className="arrow-right" onClick={() => handleArrowClicks(trendingSliderRef, 'right')}>
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/*Swiper component  */}
      <SwiperComponent/>

      {/* Recent Books Slider */}
      <div className="BookContainer">
        <div className="RecentBooks Books">
          <button className="arrow-left" onClick={() => handleArrowClicks(recentSliderRef, 'left')}>
            <i className="fa fa-chevron-left"></i>
          </button>
          <div className="headingBooks">
            <h3>Recent Books</h3>
            <div className="ReadMore">
              <a href="#">
                <span>
                  Read More <i className="fa fa-chevron-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div className="slider" ref={recentSliderRef}>
            {bookImages.map((book, index) => (
              <BookCard
                key={index}
                book={book}
                handleBookSelect={handleBookSelect}
              />
            ))}
          </div>
          <button className="arrow-right" onClick={() => handleArrowClicks(recentSliderRef, 'right')}>
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Beginner Books Slider */}
      <div className="BookContainer">
        <div className="ForBeginners Books">
          <button className="arrow-left" onClick={() => handleArrowClicks(beginnersSliderRef, 'left')}>
            <i className="fa fa-chevron-left"></i>
          </button>
          <div className="headingBooks">
            <h3>Beginner Books</h3>
            <div className="ReadMore">
              <a href="#">
                <span>
                  Read More <i className="fa fa-chevron-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div className="slider" ref={beginnersSliderRef}>
            {bookImages.map((book, index) => (
              <BookCard
                key={index}
                book={book}
                handleBookSelect={handleBookSelect}
              />
            ))}
          </div>
          <button className="arrow-right" onClick={() => handleArrowClicks(beginnersSliderRef, 'right')}>
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Intermediate Books Slider */}
      <div className="BookContainer">
        <div className="ForIntermediate Books">
          <button className="arrow-left" onClick={() => handleArrowClicks(intermediateSliderRef, 'left')}>
            <i className="fa fa-chevron-left"></i>
          </button>
          <div className="headingBooks">
            <h3>Intermediate Books</h3>
            <div className="ReadMore">
              <a href="#">
                <span>
                  Read More <i className="fa fa-chevron-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div className="slider" ref={intermediateSliderRef}>
            {bookImages.map((book, index) => (
              <BookCard
                key={index}
                book={book}
                handleBookSelect={handleBookSelect}
              />
            ))}
          </div>
          <button className="arrow-right" onClick={() => handleArrowClicks(intermediateSliderRef, 'right')}>
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Advanced Books Slider */}
      <div className="BookContainer">
        <div className="ForAdvance Books">
          <button className="arrow-left" onClick={() => handleArrowClicks(advanceSliderRef, 'left')}>
            <i className="fa fa-chevron-left"></i>
          </button>
          <div className="headingBooks">
            <h3>Advanced Books</h3>
            <div className="ReadMore">
              <a href="#">
                <span>
                  Read More <i className="fa fa-chevron-right"></i>
                </span>
              </a>
            </div>
          </div>
          <div className="slider" ref={advanceSliderRef}>
            {bookImages.map((book, index) => (
              <BookCard
                key={index}
                book={book}
                handleBookSelect={handleBookSelect}
              />
            ))}
          </div>
          <button className="arrow-right" onClick={() => handleArrowClicks(advanceSliderRef, 'right')}>
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default BookSlider;
