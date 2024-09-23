//Below Font awesome are used but linked via index.html
/* <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
  integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/> */

import React, {  useState } from "react";
import FirstPage from "./Components/FirstPage";
import SecondPage from "./Components/SecondPage";
import ThirdPage from "./Components/ThirdPage";
import Header from "./Components/Header";
import FourthPage from "./Components/FourthPage";
import Footer from "../Footer/Footer";
import "./book.css";
import { useLocation } from 'react-router-dom';

const Book = () => {
  // State for managing the 'isLiked' functionality
  const [isLiked, setIsLiked] = useState(false);
  const [favCount, setFavCount] = useState(123232); // Initial likes count
  const [showPopup, setShowPopup] = useState(false); // Manage popup visibility
const location = useLocation();
const { book } = location.state || {}  // Add fallback to avoid errors if no state is passed
  // Function to toggle the popup
  const togglePopup = () => {
    //perform togglePopup only when the isLiked is true
    if (isLiked) {
      setShowPopup(!showPopup);
    }
  };

  //book-container - wrapper element
  return (
  <>
  <div className="book-container">
      {/*header */}
      <Header
        isLiked={isLiked}
        favCount={favCount}
        showPopup={showPopup}
        togglePopup={togglePopup}
      />
      {/*FirstPage  */}
      <FirstPage
        setIsLiked={setIsLiked}
        setFavCount={setFavCount}
        favCount={favCount}
        book={book}
      />

      {/*Second Page  */}
      <SecondPage book={book} />

      {/*ThirdPage */}
      <ThirdPage book={book} />

      {/*FourthPage */}
      <FourthPage />
       
       {/*Footer */}
       <Footer/>
    </div>
 
  </>

    
  );
};

export default Book;
