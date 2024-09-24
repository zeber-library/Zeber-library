import React from 'react';
import { Link } from 'react-router-dom';

function Header({ toggleSidebar, toggleDarkMode, isDarkMode }) {
  return (
    <header>
      <nav className="reel-navbar">
        <div className="nav-section nav-left">
          <button className="nav-button menu-button" onClick={toggleSidebar}>
            <i className="uil uil-bars"></i>
          </button>

          <Link to="/" className="nav-logo">
            <img src="/reel/images/logo.png" alt="Logo" className="logo-image" />
          </Link>
        </div>

        <div className="nav-section nav-center">
          <form action="#" className="search-form">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              required
            />
            <button className="nav-button search-button">
              <i className="uil uil-search"></i>
            </button>
          </form>
          <button className="nav-button mic-button">
            <i className="uil uil-microphone"></i>
          </button>
        </div>

        <button className="lo-button">
          <i className="uil uil-upload"></i> 
          Upload your video
        </button>

        <div className="nav-section nav-right">
          <button className="nav-button search-button">
            <i className="uil uil-search"></i>
          </button>
          <button
            className="nav-button theme-button"
            onClick={toggleDarkMode}
          >
            <i
              className={`uil ${
                isDarkMode ? "uil-sun" : "uil-moon"
              }`}
            ></i>
          </button>
          <button className="sign-in-button">
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;

