import React, { useEffect } from 'react';
import {Link} from "react-router-dom"
//sidebar-prop passed from the index.js
const SidebarToggle = ({ isSidebarOpen }) => {

  useEffect(() => {
    const sidebar = document.querySelector('.sidebar');
    const icon = document.querySelector('nav.navBar .toggle span i');
    //check is sidebar is open or close and accoridngly change the styling
    if (sidebar) {
      if (isSidebarOpen){
        sidebar.style.left = '0';
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        sidebar.style.left = '-100%';
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    }
  }, [isSidebarOpen]);

  

  return (
    <div className="sidebar-toggle">
      <div className="sidebar">
        <div className="menu_content">
          {/*ul list containing the sidebar items  */}
          <ul className="menu_items">
            {/*item1 */}
            <li className="item">
              <Link to="/" className="nav_link submenu_item">
                <span className="navlink_icon">
                  <i className="bx bx-home-alt"></i>
                </span>
                <span className="navlink">Home</span>
              </Link>
            </li>
            {/*item 2 */}
            <li className="item">
              <Link to="/book" className="nav_link submenu_item">
                <span className="navlink_icon">
                  <span className="material-symbols-sharp">library_books</span>
                </span>
                <span className="navlink">My Library</span>
              </Link>
            </li>

            {/*item 3 */}
            <li className="item">
              <Link to='/book' className="nav_link submenu_item">
                <span className="navlink_icon">
                  <i className="bx bxs-heart"></i>
                </span>
                <span className="navlink">Favourites</span>
              </Link>
            </li>
            {/*item 4 */}
            <li className="item">
              <Link to="/book" className="nav_link submenu_item">
                <span className="navlink_icon">
                  <span className="material-symbols-sharp">bookmark</span>
                </span>
                <span className="navlink">Recommendation</span>
              </Link>
              <ul className="menu_items">
                <li className="item">
                  <Link to="/book" className="nav_link">
                    <span className="navlink_icon">
                      <span className="material-symbols-sharp">download</span>
                    </span>
                    <span className="navlink">Download</span>
                  </Link>
                </li>
                <li className="item">
                  <Link to="/audio-book" className="nav_link">
                    <span className="navlink_icon">
                      <span className="material-symbols-sharp">mic</span>
                    </span>
                    <span className="navlink">Audio Library</span>
                  </Link>
                </li>
                <li className="item">
                  <Link to="/video" className="nav_link">
                    <span className="navlink_icon">
                      <span className="material-symbols-sharp">laptop</span>
                    </span>
                    <span className="navlink">Video Library</span>
                  </Link>
                </li>
                <li className="item">
                  <Link to="/reels" className="nav_link">
                    <span className="navlink_icon">
                      <i className="fa-solid fa-play"></i>
                    </span>
                    <span className="navlink">Reels</span>
                  </Link>
                </li>
                <li className="item">
                  <Link to="/contact-us" className="nav_link">
                    <span className="navlink_icon">
                      <span className="material-symbols-sharp">report_gmailerrorred</span>
                    </span>
                    <span className="navlink">Opportunities</span>
                  </Link>
                </li>
              </ul>
            </li>

            {/*item 5 */}
            <li className="item">
              <Link to="/contact-us" className="nav_link">
                <span className="navlink_icon">
                  <span className="material-symbols-sharp">call</span>
                </span>
                <span className="navlink">Contact us</span>
              </Link>
            </li>

            {/*item 6 */}
            <li className="item">
              <Link to="/" className="nav_link">
                <span className="navlink_icon">
                  <span className="material-symbols-sharp">person</span>
                </span>
                <span className="navlink">About us</span>
              </Link>
            </li>

            {/**item 7 */}
            <li className="item">
              <Link to="/upload-book" className="nav_link">
                <span className="navlink_icon">
                  <span className="material-symbols-sharp">upload</span>
                </span>
                <span className="navlink">Upload Book</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarToggle;

