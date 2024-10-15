import React from 'react';
import {Link} from "react-router-dom"
import "./header.css"


const Header = () => {
  return (
    <header className='navbar-container'>
      <nav className="navBar">
        {/* SideBar Toggle span */}
        <div className="toggle">
          <span>
            <i className="fa fa-bars"></i>
          </span>
        </div>
        {/* Company Logo */}
        <div className="logo">
          <Link to="/">
            <img src="/Header-images/logo.jpeg" alt="Zeber's Logo" />
          </Link>
        </div>
        {/* SearchBar */}
        <div className="searchBar">
          <span><i className="fa fa-filter"></i></span>
          <input type="text" name="Search" id="searchBar" placeholder="Search your book here..."  style={{border:"none"}}/>
          <span><i className="fa fa-magnifying-glass"></i></span>
        </div>
        {/* Rest Icons */}
        <div className="icons">
          <Link to="/upload-book" style={{textDecoration:"none"}}>
          <div className="upload">
            <span><i className="fa fa-upload"></i></span>
            <span className="text">Upload your book</span>
          </div>
          </Link>
          
        
          <div className="subIcons">
            {/**Commenting the darkmode icon toggle darkmode  for now */}
            {/* <span>
              <i className="fa-solid fa-sun" id="darkLight"></i>
            </span> */}
            <span><i className="fa fa-bell"></i></span>
            <span><i className="fa fa-user"></i></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;