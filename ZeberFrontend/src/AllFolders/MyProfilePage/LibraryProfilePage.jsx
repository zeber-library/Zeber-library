import React, { useState, useEffect } from 'react';
import './LibraryProfilePage.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar, ProfileOverview, PaymentMethod, EditProfile, NeedHelp, Gifts, MyOrder, Address } from './Components/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import UserProfileDisplay from './UserProfileUI';
import { useNavigate } from 'react-router-dom';
import Copyright from './Copyright';
const MyProfilePage = () => {
    const [isNavBarVisible, setIsNavBarVisible] = useState(false); // Manage NavBar visibility
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024); // Detect small screens
    // Toggle NavBar visibility, only if screen width is <= 1024px
    const toggleNavBar = () => {
        if (isSmallScreen) {
            setIsNavBarVisible(!isNavBarVisible);
        }
    };
  // handle Navigation
  const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/')
    }
    // Monitor screen size to update isSmallScreen state
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1024);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
         <div className='LibraryProfilePage'>
            {/* Toggle button should only be visible on small screens */}
            {isSmallScreen && (
                <div className="toggle" onClick={toggleNavBar}>
                    {/* Toggle between showing the bars or xmark based on the state */}
                    {isNavBarVisible ? (
                        <span><FontAwesomeIcon icon={faXmark} /></span>
                    ) : (
                        <span><FontAwesomeIcon icon={faBars} /></span>
                    )}
                </div>
            )}

            {/* Show NavBar only if visible and on small screens */}
            {(isSmallScreen ? isNavBarVisible : true) && <NavBar />}

            <div className="ProfilePages">
                <h2 onClick={handleNavigation} style={{cursor:"pointer"}}>My Account</h2>
                <Routes>
                    <Route path="/profileOverview" element={<ProfileOverview />} />
                    <Route path="/myorders" element={<MyOrder />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    {/* <Route path="/payment" element={<PaymentMethod />} /> */}
                    <Route path="/gifts" element={<Gifts />} />
                    <Route path="/help" element={<NeedHelp />} />
                    <Route path="/address" element={<Address />} />
                    <Route path="/" element={<UserProfileDisplay />} />
                </Routes>
            </div>

        </div>
        <Copyright/>
        </>
       
    );
};

export default MyProfilePage;
