import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ handleShowSavedReels={handleShowSavedReels}}) {
  return (
    <aside className="sidebar">
      <div className="nav-section nav-left">
        <button className="nav-button menu-button">
          <i className="uil uil-bars"></i>
        </button>
        <Link to="/" className="nav-logo">
          <img src="/reel/images/logo.png" alt="Logo" className="logo-image" />
        </Link>
      </div>

      {/*Link containers */}
      <div className="links-container">
        <div className="link-section">
          <Link to="/" className="link-item">
            <i className="uil uil-estate"></i> Home
          </Link>
          <Link to="/reels" className="link-item">
            <i className="uil uil-video"></i> Shorts
          </Link>
          <Link to="/reels" className="link-item">
            <i className="uil uil-tv-retro"></i> Subscriptions
          </Link>
        </div>
        <div className="section-separator"></div>

        <div className="link-section">
          <h4 className="section-title">You</h4>
          <div className="link-item" onClick={ handleShowSavedReels}>
            <i className="uil uil-user-square"></i>Saved
          </div>
          <Link to="/reels" className="link-item">
            <i className="uil uil-history"></i> History
          </Link>
          <Link to="/reels" className="link-item">
            <i className="uil uil-clock"></i> Watch later
          </Link>
        </div>
        <div className="section-separator"></div>

        <div className="link-section">
          <h4 className="section-title">Explore</h4>
          <Link to="/reels" className="link-item">
            <i className="uil uil-fire"></i> Trending
          </Link>
          <Link to="/reels" className="link-item">
            <i className="uil uil-music"></i> Recommended
          </Link>
          <Link to="/reels" className="link-item">
            <i className="uil uil-trophy"></i> Favorites
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
