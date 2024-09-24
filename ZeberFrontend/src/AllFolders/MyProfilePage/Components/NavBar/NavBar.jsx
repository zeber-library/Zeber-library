import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBox, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard, faUser } from '@fortawesome/free-regular-svg-icons'; // Regular icon
import './NavBar.css'
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons/faBuildingColumns';
import { faTicket } from '@fortawesome/free-solid-svg-icons/faTicket';
import Logo from './Images/logo.jpeg'
import Avatar from './Images/Avatar.png'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';

const NavBar = ({ toggleNavBar }) => { // Accept toggleNavBar as a prop
    const profileName = 'Mellifluousguy';
    
    // Function to handle link clicks and hide navbar
    const handleLinkClick = () => {
        toggleNavBar();
    };

    return (
        <div className="MainNavbar">
            <div className="Logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="Intro">
                <div className="avatar">
                    <img src={Avatar} alt="Profile" />
                </div>
                <div className="content">
                    <span>Hi,</span>
                    <h3>{profileName}</h3>
                </div>
            </div>
            <nav className='MainSideBar'>
                <ul>
                    <li>
                        <Link to="/library-profile/myorders" onClick={handleLinkClick}><FontAwesomeIcon icon={faBox} /> My Orders</Link>
                    </li>
                    <li>
                        <Link to="/library-profile/edit-profile" onClick={handleLinkClick}><FontAwesomeIcon icon={faAddressCard} /> Edit Profile</Link>
                    </li>
                    <li>
                        <Link to="/library-profile/address" onClick={handleLinkClick}><FontAwesomeIcon icon={faHouse} /> Edit Address</Link>
                    </li>
                    {/* <li>
                        <Link to="/payment" onClick={handleLinkClick}><FontAwesomeIcon icon={faBuildingColumns} />Payment Methods</Link>
                    </li> */}
                    <li>
                        <Link to="/library-profile/gifts" onClick={handleLinkClick}><FontAwesomeIcon icon={faTicket} />Gift cards & vouchers</Link>
                    </li>
                    <li>
                        <Link to="/library-profile/help" onClick={handleLinkClick}><FontAwesomeIcon icon={faCircleQuestion} /> Need help?</Link>
                    </li>
                    <li>
                        <Link to="/library-profile" onClick={handleLinkClick}><FontAwesomeIcon icon={faArrowRightFromBracket} />Sign Out</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
