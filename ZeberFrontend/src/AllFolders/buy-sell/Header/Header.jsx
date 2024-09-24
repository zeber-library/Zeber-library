import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';
import logo from '../../../assets/logo.png';

const Header = () => {
  return (
    <header className="book-sell-header">
      <div className="top-row">
        <div className="logo-search">
          <img src={logo} alt="Logo" className="logo" />
          <div className="search-bar">
            <input type="text" placeholder="Search" />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="top-links">
          <button className="sell-button">Sell Your Books</button>
          <a href="#" className="nav-link">About</a>
          <a href="#" className="nav-link">FAQ</a>
          <a href="#" className="nav-link"><FaHeart /></a>
          <Link to="/cart" className="nav-link">
            <FaShoppingCart />
          </Link>
         
          <a href="#" className="nav-link">Log in</a>
        </div>
      </div>
      <nav className="nav-menu">
        <a href="#" className="nav-link">Young Adult</a>
        <a href="#" className="nav-link">Fantasy</a>
        <a href="#" className="nav-link">Sci-Fi</a>
        <a href="#" className="nav-link">Thrillers</a>
        <a href="#" className="nav-link">Romance</a>
        <a href="#" className="nav-link">Comics</a>
        <a href="#" className="nav-link">Historical Fiction</a>
        <a href="#" className="nav-link">Biography</a>
        <a href="#" className="nav-link">Kids' Books</a>
        <a href="#" className="nav-link">History</a>
        <a href="#" className="nav-link">More Categories</a>
      </nav>
    </header>
  );
};

export default Header;

