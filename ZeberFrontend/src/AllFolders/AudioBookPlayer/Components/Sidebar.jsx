// Sidebar.js
import React , {useEffect} from "react";
import {Link} from "react-router-dom"

//receiveing props from the AudioBookPlayer component 
//isSidebarOpen --- state tell whether the sidebar is open or not and hide and show sidebar accordingly 

//toggleSidebar -- for toggling the sidebar if closed then open and viceversa 
const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {


  return (
    //*hiding and showing the sidebar *
    <aside
       className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}
    >
      <div className="logo">
        {/*button for closing the sidebar inside sidebar  */}
        <button className="menu-btn" id="menu-close" onClick={toggleSidebar}>
          <i className="bx bx-log-out-circle"></i>
        </button>

        {/*logo */}
       <Link to="/"> <img src="/AudioBookPlayer/images/zeberlogoS.jpeg" alt="Logo" /></Link>
      </div>

      {/**menu  */}
      <div className="menu">
        <h5>Menu</h5>
        <ul>
          <li>
            <i className="bx bxs-book-reader"></i>
            <Link to="/">Explore</Link>
          </li>
          <li>
            <i className="bx bxs-bookmark-alt"></i>
            <Link to="/">Genres</Link>
          </li>
          <li>
            <i className="bx bxs-book"></i>
            <Link to="/">Recommended</Link>
          </li>
          <li>
            <i className="bx bxs-user"></i>
            <Link href="/">Authors</Link>
          </li>
        </ul>
      </div>

      {/**library */}
      <div className="menu">
        <h5>Library</h5>
        <ul>
          <li>
            <i className="bx bx-history"></i>
            <Link href="/">Recent</Link>
          </li>
          <li>
            <i className="bx bxs-heart"></i>
            <Link to="/">Favorites</Link>
          </li>
        </ul>
      </div>

      {/**playlist section  */}
      <div className="menu">
        <h5>Playlists</h5>
        <ul>
          <li>
            <i className="bx bxs-plus-square"></i>
            <Link to="/">Create New</Link>
          </li>
        </ul>
      </div>
      <div className="playing">
        <div className="top">
          <img src="/AudioBookPlayer/images/download.jpg" alt="Now Playing" />
          <p>
            Kindle
            <br />
            Oasis
          </p>
        </div>
        <div className="bottom">
          <i className="bx bx-headphone"></i>
          <p>UP NEXT</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
