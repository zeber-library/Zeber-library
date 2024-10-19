import React, { useState, useEffect, useRef } from 'react';

//! Component to display book details and a slider for popular highlights
//!showing description of the book 
const SecondPage = ({book}) => {
  // for toggling the read more 
  const [isReadMore, setIsReadMore] = useState(true);
  //text will be visible by default 
  const visibleTextLength = 350;
  

  //function to toggle the read more state --true /false 
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  //reference to the our recommendation slider and individual slider 
  const slidesContainerRef = useRef(null);
  const slidesRef = useRef([]);

    // State to keep track of the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
       // Function to update the slide position based on the current index
    const updateSlidePosition = () => {
      const slidesContainer = slidesContainerRef.current;
      const slides = slidesRef.current;
      let offset = 0;
      const isMobile = window.innerWidth <= 768;

      // Calculate the offset for the slides container based on the current index
      if (!isMobile) {
        for (let i = 0; i < currentIndex - 1; i++) {
          offset += slides[i].clientWidth;
        }
      } else {
        for (let i = 0; i < currentIndex; i++) {
          offset += slides[i].clientWidth;
        }
      }

      // Apply the calculated offset to the slides container
      slidesContainer.style.transform = 'translateX(' + -offset + 'px)';
    };

    updateSlidePosition();
    window.addEventListener('resize', updateSlidePosition);

    return () => {
      // Update position on window resize
      window.removeEventListener('resize', updateSlidePosition);
    };
  }, [currentIndex]);


   // Handler for the previous slide button
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : slidesRef.current.length - 1));
  };


   // Handler for the next  slide button
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex < slidesRef.current.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div id="SecondPage">
      <nav>
        <a href="">Details</a>
        <a href="">Author</a>
        <a href="">Reviews</a>
      </nav>
      <section>
        <h3>Description</h3>
        {/**book description truncation logic  */}
        <p id="Description">
          {isReadMore ? book?.bookDescription.slice(0, visibleTextLength) + '...' :book?.bookDescription}
        </p>
        <span style={{color:'blue'}} onClick={toggleReadMore}>
          {isReadMore ? 'Read More' : 'Read Less'}
        </span>
      </section>

      <aside>
        <div className="heading">
          <h2>Popular Highlights in this book</h2>
          <span>What are popular highlights?</span>
        </div>

        {/**slider  */}
        {/*currently having four images only for slides  */}
        <div className="slider">
          <div className="slides" ref={slidesContainerRef}>
            <div className="slide" ref={(el) => (slidesRef.current[0] = el)}>
              <img
                src={book?.popularBooks[0]}
                alt="Image 1"
              />
            </div>
            <div className="slide" ref={(el) => (slidesRef.current[1] = el)}>
              <img  src={book?.popularBooks[1]} alt="Image 2" />
            </div>
            <div className="slide" ref={(el) => (slidesRef.current[2] = el)}>
              <img
                 src={book?.popularBooks[2]}
                alt="Image 3"
              />
            </div>
            <div className="slide" ref={(el) => (slidesRef.current[3] = el)}>
              <img  src={book?.popularBooks[3]} alt="Image 4" />
            </div>
            {/* Add more slides as needed */}
          </div>

          {/**handle previous button  */}
          <button className="nav prev" onClick={handlePrevClick}>
            ❮
          </button>

          {/**handle next click button  */}
          <button className="nav next" onClick={handleNextClick}>
            ❯
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SecondPage;
