import React from 'react';
import {Link} from "react-router-dom";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        //setting the inline style depending on the isSidebarOpen
        <aside className="sidebar" style={{ left: isSidebarOpen ? '0' : '-100%', transition: 'left 0.3s ease' }}>

            <div className="logo">
                {/*button to toggle the sidebar in smaller screens */}
                <button className="menu-btn" id="menu-close" onClick={toggleSidebar}>
                    <i className='bx bx-log-out-circle'></i>
                </button>

                {/*zeber logo */}
               <Link to="/"> <img src="/MusicImages/zeberlogoS.jpeg" alt="" /></Link>
            </div>

            {/*---- Menu section ---- */}
            <div className="menu">
                <h5>Menu</h5>
                <ul>
                    <li>
                        <i className='bx bxs-book-reader'></i>
                        <Link to="/">Explore</Link>
                    </li>
                    <li>
                        <i className='bx bxs-bookmark-alt'></i>
                        <Link to="/book">Genres</Link>
                    </li>
                    <li>
                        <i className='bx bxs-book'></i>
                        <Link to='/book'>Recommended</Link>
                    </li>
                    <li>
                        <i className='bx bxs-user'></i>
                        <Link to="/book">Authors</Link>
                    </li>
                </ul>
            </div>

            <div className="menu">
                <h5>Library</h5>
                <ul>
                    <li>
                        <i className='bx bx-history'></i>
                        <Link to="/book">Recent</Link>
                    </li>
                    <li>
                        <i className='bx bxs-heart'></i>
                        <Link to="/book">Favorites</Link>
                    </li>
                </ul>
            </div>

            <div className="menu">
                <h5>Playlists</h5>
                <ul>
                    <li>
                        <i className='bx bxs-plus-square'></i>
                        <Link to="/thill">Create New</Link>
                    </li>
                </ul>
            </div>

            <div className="playing">
                <div className="top">
                    <img src="/MusicImages/download.jpg" alt=""/>
                    <h4>Kindle<br/>Oasis</h4>
                </div>
                <div className="bottom">
                    <i className='bx bx-headphone'></i>
                    <p>UP NEXT</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
