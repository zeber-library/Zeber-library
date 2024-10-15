import React, { useState, useEffect } from 'react';
import Header from "./Components/Header"
import BookSlider from './Components/BookSlider';
import AboutBook from './Components/AboutBook';
import SidebarToggle from './Components/Sidebar';
import FlipBoxComponent from './Components/FlipBoxComponent';
import Footer from '../Footer/Footer';
import "./library.css";

const Library = () => {

//useStates for the darkmode , selectbook , sidebaropen
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//!DARKMODE
  //function to toggle the dark mode 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  //useEffect for handling darkmode operation when darkmode is set to true 
  useEffect(() => {
    const libraryContainer = document.querySelector(".library-container");
    libraryContainer.classList.toggle('dark', darkMode);
    const darkLightIcon = document.getElementById('darkLight');
    if (darkLightIcon) {
      if (darkMode) {
        darkLightIcon.classList.replace('fa-sun', 'fa-moon');
      } else {
        darkLightIcon.classList.replace('fa-moon', 'fa-sun');
      }
    }
  }, [darkMode]);


//! SELECT-BOOK
//function to toggle the selectbook 
  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  //useEffect to perform some styling oepration when book is selected
  useEffect(() => {
    if (selectedBook) {
      const aboutBookContainer = document.querySelector('.BookContainer .AboutBook');
      const sliders = document.querySelectorAll('.BookContainer .slider');
      const headingBooks = document.querySelectorAll('.BookContainer .headingBooks');
      const mediumScreen = window.matchMedia("(max-width: 1024px)");
  
      // Adjust based on screen size
      if (mediumScreen.matches) {
        document.querySelectorAll('.BookContainer .Books').forEach(book => {
          book.style.width = '85%';
        });
  
        sliders.forEach(slider => {
          slider.style.width = '90%';
        });
  
        headingBooks.forEach(heading => {
          heading.style.width = '90%';
        });
  
        aboutBookContainer.style.width = '100%';
        aboutBookContainer.style.top = '7%';
        aboutBookContainer.style.padding = '5% 0%';
        aboutBookContainer.style.height = '100vh';
  
        document.querySelectorAll('.TrendingBooks .slide').forEach(trendingSlide => {
          trendingSlide.style.flex = `0 0 auto`;
          trendingSlide.style.width = '86%';
        });
        document.querySelector('.TrendingBooks').style.width = '90%';
        document.querySelector('.TrendingBooks .headingBooks').style.width = `90%`;
  
      } else {
        document.querySelectorAll('.BookContainer .Books').forEach(book => {
          book.style.width = '67%';
        });
  
        sliders.forEach(slider => {
          slider.style.width = '100%';
        });
  
        headingBooks.forEach(heading => {
          heading.style.width = '100%';
        });
  
        document.querySelectorAll('.TrendingBooks .slide').forEach(trendingSlide => {
          trendingSlide.style.width = '20%';
        });
        document.querySelector('.TrendingBooks').style.width = '57%';
        document.querySelector('.TrendingBooks .headingBooks').style.width = `100%`;
      }
  
      aboutBookContainer.style.right = '0%';
  
      // Handle slide click event
      document.querySelectorAll('.slide').forEach(slide => {
        slide.addEventListener('click', function () {
          let index = this.getAttribute('data-index');
          let aboutBookImage = document.querySelector('.AboutBook .image img');
          aboutBookImage.src = selectedBook[index].image;  // Assuming selectedBook has an image property
  
          if (mediumScreen.matches) {
            this.style.flex = '0 0 90%';
          } else {
            this.style.width = '20%';
          }
        });
      });
  
      // Cleanup event listeners when component unmounts
      return () => {
        document.querySelectorAll('.slide').forEach(slide => {
          slide.removeEventListener('click', null);
        });
      };
    }
  }, [selectedBook]);
  

//! CLOSE-SELECTED-BOOK
  const handleCloseBook = () => {
    setSelectedBook(null);
    
    const aboutBookContainer = document.querySelector('.BookContainer .AboutBook');
    const sliders = document.querySelectorAll('.BookContainer .slider');
    const headingBooks = document.querySelectorAll('.BookContainer .headingBooks');
    const books = document.querySelectorAll('.BookContainer .Books');
    const slides = document.querySelectorAll('.TrendingBooks .slide');
    const mediumScreen = window.matchMedia("(max-width: 1024px)");
  
    // Hide AboutBook section
    aboutBookContainer.style.right = '-100%';
  
    if (mediumScreen.matches) {
      // Reset styles for medium screens
      books.forEach(book => {
        book.style.width = '95%';
      });
  
      sliders.forEach(slider => {
        slider.style.width = '100%';
      });
  
      headingBooks.forEach(heading => {
        heading.style.width = '100%';
      });
  
      slides.forEach(slide => {
        slide.style.flex = '0 0 43%';
        slide.style.width = '43%';
      });
  
      document.querySelector('.TrendingBooks').style.width = '90%';
      document.querySelector('.TrendingBooks .headingBooks').style.width = '90%';
  
    } else {
      // Reset styles for larger screens
      books.forEach(book => {
        book.style.width = '85%';
      });
  
      sliders.forEach(slider => {
        slider.style.width = '100%';
      });
  
      headingBooks.forEach(heading => {
        heading.style.width = '100%';
      });
  
      slides.forEach(slide => {
        slide.style.width = '15%';
      });
  
      document.querySelector('.TrendingBooks').style.width = '72%';
      document.querySelector('.TrendingBooks .headingBooks').style.width = '100%';
    }
  };



//!TOGGLE-SIDEBAR
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
//useEFFect for sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true); // Sidebar open by default on larger screens
      } else {
        setIsSidebarOpen(false); // Sidebar closed by default on smaller screens
      }
    };

    // Set the initial state based on window size
    handleResize();

    // Add a resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


 
  
  return (
    <div className='library-container'>
      {/*Header component */}
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSidebar={toggleSidebar} />

      {/*FLipBox Component */}
      <FlipBoxComponent/>

      {/*BookSLider compoenent and AboutBook*/}
      <BookSlider handleBookSelect={handleBookSelect} />
      {selectedBook && (
        <AboutBook book={selectedBook} handleClose={handleCloseBook} />
      )}

      {/*Sidebar component  */}
      <SidebarToggle  isSidebarOpen={isSidebarOpen}  />
      <Footer/>
    </div>
  );
};

export default Library;
