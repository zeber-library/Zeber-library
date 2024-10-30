
import React from "react";
import "../header.css"
// For receiving prop from AudioBookPlayer for toggling (especially opening of sidebar)
const Header = ({ toggleSidebar }) => (
  <header className="header">
    <div className="nav-links">
      {/* Bars button for toggling sidebar */}
      <button className="menu-btn" onClick={toggleSidebar} id="menu-open">
        <i className="bx bx-menu"></i>
      </button>

      {/* Search component */}
      <div className="search">
        <i className="bx bx-search"></i>
        <input type="text" placeholder="Type here to search books" />
      </div>
    </div>

    {/* Profile section */}
    <div className="profile">
      {/* Bell icon */}
      <i className="bx bxs-bell"></i>

      {/* Settings icon */}
      <i className="bx bxs-cog"></i>

      {/* User profile 1 */}
      <div className="user">
        <div className="left">
          <img
            src="MusicImages/360_F_362562495_Gau0POzcwR8JCfQuikVUTqzMFTo78vkF.jpg"
            alt="Profile"
          />
        </div>
        <div className="right">
          <span>Sign In</span>
        </div>
      </div>

      {/* User profile 2 (Upload Audio) */}
      <div className="user">
        <div className="left">
          <img
            src="MusicImages/pngtree-file-upload-icon-image_1344393.jpg"
            alt="Upload"
          />
        </div>
        <a href="/upload-book">
          <div className="right">
            <span>Upload Audio</span>
          </div>
        </a>
      </div>
    </div>
  </header>
);

export default Header;
