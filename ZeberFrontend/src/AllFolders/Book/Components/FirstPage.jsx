import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FirstPage = ({  setIsLiked, setFavCount, favCount,book }) => {
  // State to manage the current slide index in the slideshow
  const [slideIndex, setSlideIndex] = useState(1);

  // Effect to handle the display of slides based on the current slideIndex
  useEffect(() => {
    showSlides(slideIndex);
  }, [slideIndex]);

  // Function to change the slide index
  const plusSlides = (n) => {
    // Cycle through slides: if slideIndex is above the number of slides, go to the first slide; if below 1, go to the last slide
    setSlideIndex((prev) => (prev + n > 3 ? 1 : prev + n < 1 ? 3 : prev + n));
  };

  // Function to set the current slide based on the index
  const currentSlide = (n) => {
    setSlideIndex(n);
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  // Function to show the slides based on the current index
  const showSlides = (n) => {
    let slides = document.querySelectorAll("#FirstPage .slides");
    let thumbnails = document.getElementsByClassName("thumbnail");

    // Ensure the slide index is within bounds
    if (n > slides.length) {
      setSlideIndex(1);
    }
    if (n < 1) {
      setSlideIndex(slides.length);
    }

    // Display the current slide and hide others
    slides.forEach((slide, i) => {
      slide.style.display = i + 1 === n ? "block" : "none";
    });

    // Update thumbnail active state
    Array.from(thumbnails).forEach((thumbnail, i) => {
      thumbnail.className = thumbnail.className.replace(" active", "");
      if (i + 1 === n) {
        thumbnail.className += " active";
      }
    });
  };

  // Function to handle the like button click
  const handleLikeClick = (e) => {
    e.preventDefault();
    setIsLiked((prevLiked) => {
      setFavCount((prevCount) => (prevLiked ? prevCount - 1 : prevCount + 1));
      return !prevLiked;
    });
  };

  
  return (
    <div id="FirstPage">
      {/* Slideshow */}
      <section>
        <div className="slideshow-container">
          <div className="slides">
            <img src={book?.coverImages[0]} alt="Book 1" />
          </div>
          <div className="slides">
            <img src={book?.coverImages[1]} alt="Book 2" />
          </div>
          <div className="slides">
            <img src={book?.coverImages[2]} alt="Book 3" />
          </div>
          <div className="slide-control">
            <a className="prev" onClick={() => plusSlides(-1)}>
              <span>&#10094;</span>
            </a>
            <a className="next" onClick={() => plusSlides(1)}>
              <span>&#10095;</span>
            </a>
          </div>
        </div>
        <div className="thumbnail-container">
          <img
            className="thumbnail"
            src={book?.coverImages[0]}
            onClick={() => currentSlide(1)}
            alt="Book 1"
          />
          <img
            className="thumbnail"
            src={book?.coverImages[1]}
            onClick={() => currentSlide(2)}
            alt="Book 2"
          />
          <img
            className="thumbnail"
            src={book?.coverImages[2]}
            onClick={() => currentSlide(3)}
            alt="Book 3"
          />
        </div>
      </section>


      {/* Text content */}
      <aside>
        {/*socials  */}
        <div className="social">
          <div className="fav">
            <a href="#" className="favourite" onClick={handleLikeClick}>
              <i className="fa-solid fa-heart"></i>
            </a>
            <span>{favCount.toLocaleString()}</span>
          </div>
          <div className="Share">
            <a href="#" className="share">
              <i className="fa-solid fa-share"></i>
            </a>
            <span>12</span>
          </div>
        </div>

        {/*heading */}
        <div className="heading">
          <h1>
         { book?.title}
          </h1>
        </div>

        {/*buttons */}
        <div className="buttons">
          <Link to="/video" target="_blank">
            <button>Video Summary</button>
          </Link>
          <Link to="/music" target="_blank">
            <button>Audio Summary</button>
          </Link>
        </div>

        {/*Highlights */}
        <div className="highlights">
          <div className="heading">
            <h3>Highlights</h3>
          </div>
          <nav>
            <div className="items">
              <img src="/Book/images/language.svg" alt="Language" />
              <span>{book?.language}</span>
              <p>Language</p>
            </div>
            <div className="items">
              <img src="/Book/images/paper.svg" alt="Pages" />
              <span>{book?.pages}</span>
              <p>Pages</p>
            </div>
           
            <div className="items">
              <img src="/Book/images/calendar.svg" alt="Calendar" />
              <span>{formatDate(book?.createdAt)}</span>
              <p>Publish Date</p>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default FirstPage;
