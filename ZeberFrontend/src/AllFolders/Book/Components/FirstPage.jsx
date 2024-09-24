import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShareBookButton from "./shareBookButton";

const FirstPage = ({ setIsLiked, setFavCount, favCount }) => {
  // State to manage the current slide index in the slideshow
  const [slideIndex, setSlideIndex] = useState(1);

  // State to manage the share popup
  const [shareBook, setShareBook] = useState(false);

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

  // Function to handle the share button click
  const handleShareClick = (e) => {
    e.preventDefault();
    setShareBook(true);
  }

  return (
    <div id="FirstPage">
      {/* Slideshow */}
      <section>
        <div className="slideshow-container">
          <div className="slides">
            <img src="/Book/images/1154308-M.jpg" alt="Book 1" />
          </div>
          <div className="slides">
            <img src="/Book/images/123863-M.jpg" alt="Book 2" />
          </div>
          <div className="slides">
            <img src="/Book/images/14638562-M.jpg" alt="Book 3" />
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
            src="/Book/images/1154308-M.jpg"
            onClick={() => currentSlide(1)}
            alt="Book 1"
          />
          <img
            className="thumbnail"
            src="/Book/images/123863-M.jpg"
            onClick={() => currentSlide(2)}
            alt="Book 2"
          />
          <img
            className="thumbnail"
            src="/Book/images/14638562-M.jpg"
            onClick={() => currentSlide(3)}
            alt="Book 3"
          />
        </div>
      </section>

      {/* Text content */}
      <aside>
        <div className="social">
          <div className="fav">
            <a href="#" className="favourite" onClick={handleLikeClick}>
              <i className="fa-solid fa-heart"></i>
            </a>
            <span>{favCount.toLocaleString()}</span>
          </div>
          <div className="Share">
            <a href="#" className="share" onClick={handleShareClick}>
              <i className="fa-solid fa-share"></i>
            </a>
            <span>12</span>
          </div>
        </div>
        <div className="heading">
          <h1>
            Verity: The Thriller That Will Capture Your Heart And Blow Your Mind
          </h1>
        </div>
        <div className="buttons">
          <Link to="/video" target="_blank">
            <button>Video Summary</button>
          </Link>
          <Link to="/music" target="_blank">
            <button>Audio Summary</button>
          </Link>

        </div>
        <div className="highlights">
          <div className="heading">
            <h3>Highlights</h3>
          </div>
          <nav>
            <div className="items">
              <img src="/Book/images/language.svg" alt="Language" />
              <span>ENGLISH</span>
              <p>Language</p>
            </div>
            <div className="items">
              <img src="/Book/images/paper.svg" alt="Pages" />
              <span>336</span>
              <p>Pages</p>
            </div>
            <div className="items">
              <img src="/Book/images/binding.svg" alt="Binding" />
              <span>PAPERBACK</span>
              <p>Binding</p>
            </div>
            <div className="items">
              <img src="/Book/images/calendar.svg" alt="Calendar" />
              <span>2022</span>
              <p>Publish Date</p>
            </div>
          </nav>
        </div>

        <ShareBookButton shareBook={shareBook} setShareBook={setShareBook}/>
        <Link to="/buy-sell" className="buyBook" target="_blank">
          <button>Buy Book</button>
        </Link>
      </aside>

    </div>
  );
};

export default FirstPage;
