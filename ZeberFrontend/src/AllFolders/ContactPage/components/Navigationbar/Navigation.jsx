import React from "react";
import {Link} from "react-router-dom";
import style from "./Navigation.module.css";
import logo from '../../assets/images/logo.png';

function Navigation() {
  return (
    <nav className={`${style.navigation}`}>
      <Link to="/" className={style.logo}>
        <img
          src={logo}
          alt="Site Logo"
          className={style.mainLogo}
        />
        <img
            src="/images/logo.jpg"
          alt="Site Logo"
          className={style.stickyLogo}
        />
      </Link>

      <div className={`${style.menuWrapper} ${style.navRight}`} data-top="992">
        <ul className={style.siteMainMenu}>
          <li>
            <Link className={style.activePage} to="/">Home</Link>
          </li>
          <li>
            <Link to="/video">Video Library</Link>
          </li>
          <li>
            <Link to="/audio-book">Audio library</Link>
          </li>
          
         
          <li>
            <Link to="/">Events</Link>
          </li>
          <li>
            <div className={style.dropdown}>
              <a className={style.dropbtn} href="service.html">Services</a>
              <div className={style.dropdownContent}>
                <a href="#mission">Learning</a>
                <a href="#vision">Development</a>
                <a href="#history">Mentorship</a>
                <a href="#history">E-books</a>
                <a href="#history">Reels</a>
              </div>
            </div>
          </li>
       
          <li className={style.dNone}>
            <Link to="/reels">Reels</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
        </ul>

        <button className={style.pixBtn + ' ' + style.submitBtn}>
          <a
            style={{ color: '#fff', fontWeight: 600, fontSize: '14px', textDecoration:'none' }}
            href="https://www.www.zeber.in/quote"
          >
           Sign up
          </a>
        </button>
        <button className={`${style.pixBtn} ${style.submitBtn} ${style.loginBtnShowing}`}>
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
