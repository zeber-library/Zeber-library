import React, { useEffect } from "react";
import { Link } from "react-router-dom";

//to do --- update a tag to Link tag to some of the tag that have # href 
//Header component 
const Header = ({ isLiked, showPopup, togglePopup }) => {

  //useeffect to hide and show the popupcontainer
  useEffect(()=>{
      if(showPopup){
        document.querySelector("#popupContainer").style.display  = 'flex';//show the popup 
      }
      else{
        document.querySelector("#popupContainer").style.display = 'none';//hide the popup
      }
  },[showPopup])


  return (
    <>
    {/**nav */}
      <div className="Nav">
        <input type="checkbox" id="naVisible" />
        <label for="naVisible">
          <i className="fa fa-bars"></i>
          <i className="fa fa-xmark"></i>
        </label>
        <nav id="MainNav">
          {/*Zeber logo */}
          <Link to="/" className="logo">
            <img src="/Book/images/favicon.png" alt="Zeber Logo" />
          </Link>

          {/*search */}
          <div className="navMiddle">
            <input
            
              type="text"
              id="search"
              placeholder="Search your book here..."
            />
            <a href="#">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
          </div>


        {/**NAV-RIGHT section  */}
          <div className="navRight">
            {/*Language select*/}
            <select name="Language">
              <option value="English">🇺🇸 &nbsp; English</option>
              <option value="Hindi">🇮🇳 &nbsp; Hindi</option>
            </select>

            {/*Favourite */}

            <Link to="/book" className={`favourite ${isLiked ? "show" : ""}`} id="favourite"  data-increment={isLiked ? "1" : "0"}  onClick={togglePopup}>
              <i className="fa-regular fa-heart"></i>
            </Link>

            {/*cart */}
            <Link to="/book" className="cart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>

            {/**user */}
            <a href="#" className="user">
              <i className="fa-solid fa-user"></i>
            </a>
          </div>
        </nav>
      </div>

      {/**popup  when clicked on the heart */}
      
        <div id="popupContainer" className="popup-container" onClick={togglePopup}>
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <h2>Favourite Item</h2>
            <img
              src="/Book/images/1154308-M.jpg"
              alt="Item Image"
              className="popup-image"
            />
            <h3>Book Name</h3>
            <p className="author-name">Author Name</p>
          </div>
        </div>
    
    </>
  );
};

export default Header;
