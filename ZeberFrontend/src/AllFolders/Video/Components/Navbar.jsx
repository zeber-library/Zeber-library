import React from 'react';
import {Link} from "react-router-dom"


const NavBar=()=> {
  return (
    <div className="navBar">
      <div className="mainNav">
        <input type="checkbox" name="toggle" id="toggleNav" />
        <div className="icon">
          <label htmlFor="toggleNav">
            <i className="fa fa-bars"></i>
            <i className="fa fa-xmark"></i>
          </label>
        </div>
        <div className="navContainer">
          <nav>
            <div className="navLinks">
              <Link to="/">HOME</Link>
            </div>
            <div className="navLinks">
              <Link to="/">ABOUT</Link>
            </div>
            <div className="navLinks">
              <Link to="/">SOCIAL</Link>
            </div>
            <div className="navLinks">
              <Link to="/contact-us">CONTACT</Link>
            </div>
            <div className="navSocial">
              <Link to="/"><i className="fa-brands fa-youtube"></i></Link>
              <Link to="/"><i className="fa-brands fa-facebook"></i></Link>
              <Link to="/"><i className="fa-brands fa-instagram"></i></Link>
              <Link to="/"><i className="fa-brands fa-x-twitter"></i></Link>
              <Link to="/"><i className="fa fa-envelope"></i></Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="logo">
        <Link to="/" style={{color:"White"}}><h1>ZEBER</h1></Link>
      </div>
    </div>
  );
}

export default NavBar;

