import React from 'react';

//for receiving prop from AudioBookPLayer for toggling (specially opening od sidebar )
const Header = ({ toggleSidebar }) => (
  <header className="header">
    <div className='nav-links'>

      {/*bars button for toggling sidebar */}
      <button className='menu-btn' onClick={toggleSidebar} id="menu-open">
        <i className="bx bx-menu"></i>
      </button>

      {/**search component */}
      <div className="search">
        <i className="bx bx-search"></i>
        <input type="text" placeholder="Type here to search books" />
      </div>
    </div>
  </header>
);

export default Header;


