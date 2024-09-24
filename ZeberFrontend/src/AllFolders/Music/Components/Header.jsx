import React from 'react';

const Header = ({ toggleSidebar }) => {
    return (
        <header>
            <div className="nav-links">
                <button className="menu-btn" id="menu-open" onClick={toggleSidebar}>
                    <i className='bx bx-menu'></i>
                </button>
                {/*search bar */}
                <div className="search">
                    <i className='bx bx-search'></i>
                    <input type="text" placeholder="Type here to search books" />
                </div>
            </div>
        </header>
    );
};

export default Header;


