
// <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
//this is linked in index.html for the icons of this page 


import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import ContentWrapper from "./Components/ContentWrapper";
import SavedReelDisplay from "./Components/savedReels"
import CommentBox from "./Components/CommentBox";
import "./ReelStyle.css"

function Reel() {
  //state for sidebar and the darkmode 
  const [isSidebarHidden, setIsSidebarHidden] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isShowSavedReels,setIsShowSavedReels]=useState(0);
 

  const [isReelCommentBoxActive, setReelCommentBoxIsActive] = useState(false);
  const[reelId,setreelId]=useState(null)
  const ToggleCommentBox = (reelId) => {
    setReelCommentBoxIsActive(!isReelCommentBoxActive);
    setreelId(reelId)
  };
 
  //hide the sidebar for screen >=768px
  useEffect(() => {
    // Check screen width on component mount
    if (window.innerWidth >= 768) {
      setIsSidebarHidden(false);
    }
  }, []);
 
  const handleShowSavedReels=()=>{
    setIsShowSavedReels(1);
  }
  
  //It retrieves the dark mode preference from local storage. If the stored value is "enabled", it sets isDarkMode to true. Otherwise, it sets it to false.
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "enabled";
    setIsDarkMode(storedDarkMode);
  }, []);


  //applying the darkmode and set the loacalstorage 
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  }, [isDarkMode]);


  //function to toggle the sidebar 
  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };


  //function to toggle the darkmode 
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  return (
    <div className={`App ${isSidebarHidden ? "sidebar-hidden" : ""} reel-app-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleDarkMode={toggleDarkMode} 
        isDarkMode={isDarkMode} 
      />

      <div className="main-layout">
      {!isSidebarHidden && <Sidebar  handleShowSavedReels={handleShowSavedReels}/>}
        {!isSidebarHidden && (
          <div className="screen-overlay" onClick={toggleSidebar}></div>
        )}

        {isShowSavedReels?<SavedReelDisplay toggleCommentBox={ToggleCommentBox}/>:<ContentWrapper/>}
        {isReelCommentBoxActive &&  <CommentBox isCommentBoxActive={isReelCommentBoxActive} toggleCommentBox={ToggleCommentBox} reelId={reelId}/>}
        
      </div>
    </div>
  );
}

export default Reel;
