import React, {  useState } from "react";
import FirstPage from "./Components/FirstPage";
import SecondPage from "./Components/SecondPage";
import ThirdPage from "./Components/ThirdPage";
import Header from "./Components/Header";
import FourthPage from "./Components/FourthPage";
import Footer from "../Footer/Footer";
import "./book.css";



const Book = () => {
  // State for managing the 'isLiked' functionality
  const [isLiked, setIsLiked] = useState(false);
  const [favCount, setFavCount] = useState(123232); // Initial likes count
  const [showPopup, setShowPopup] = useState(false); // Manage popup visibility

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
      />

      {/*Second Page  */}
      <SecondPage />

      {/*ThirdPage */}
      <ThirdPage />

      {/*FourthPage */}
      <FourthPage />
       
       {/*Footer */}
       <Footer/>
    </div>
 
  </>

    
  );
};

export default Book;
