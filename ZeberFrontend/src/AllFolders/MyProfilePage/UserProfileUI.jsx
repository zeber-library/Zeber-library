import "./UserProfileUI.css";
import React, { useEffect,useState } from 'react';
import axios from 'axios';
const UserProfileDisplay = () => {
  const [userProfile, setUserProfile] = useState({});
    useEffect(()=>{
       const fetchUserProfile=async()=>{
        try{
            const userId="66ddfda258de85a04f9880fb";
            const response=await axios.get(`http://localhost:3000/api/v1/profileUser/getUserProfile/${userId}`);
            setUserProfile(response.data);
            console.log(response.data);
        }catch(err){
             console.log(err);
        }
       }
         fetchUserProfile();
    },[])
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    };
    return (
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-card">
          <div className="profile-item">
            <span className="profile-label"> Name</span>
            <span className="profile-value">{userProfile.firstName} {userProfile.lastName}</span>
          </div>
         
          <div className="profile-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">{userProfile.email}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Date of Birth</span>
            <span className="profile-value">{formatDate(userProfile.DOB)}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Phone</span>
            <span className="profile-value">{userProfile.phone}</span>
          </div>
        </div>
      </div>
    );
};

export default UserProfileDisplay;