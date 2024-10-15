import React, { useEffect, useState } from 'react';
import './EditProfile.css';
const EditProfile = () => {
const userId="66ddfda258de85a04f9880fb"

  // Initialize state with pre-filled values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    DOB: '',
    phone: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/profileUser/getUserProfile/${userId}`);
        const data = await response.json();
        
        console.log(data);
        const formattedDOB = new Date(data.DOB).toISOString().split('T')[0];
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          DOB:formattedDOB,
          phone: data.phone,
        });
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the data');
      }
    };

    fetchProfileData();
  }, [userId]);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/v1/profileUser/addUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, userId}),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log('Profile added:', responseData);
        alert('Profile added successfully!');
        // Clear form fields
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          DOB: '',
          phone: '',
        });
     
      } else {
        console.error('Failed to add profile:', response.statusText);
        alert('Failed to add profile');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
    }
  };


  return (
    <div className='EditProfile'>
      <div className="heading">
        <h1>My Details</h1>
        <p>
          Feel free to edit any of your details below. (* Indicates a required field).
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Existing form fields */}
        <div className="form-group">
          <label htmlFor="FirstName">First Name <span>*</span></label>
          <input
            type="text"
            name="firstName"
            id="FirstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            maxLength="18"
            placeholder='First Name'
          />
        </div>

        <div className="form-group">
          <label htmlFor="LastName">Last Name <span>*</span></label>
          <input
            type="text"
            name="lastName"
            id="LastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            maxLength="18"
            placeholder='Last Name'
          />
        </div>

        <div className="form-group">
          <label htmlFor="EmailId">Email Address</label>
          <input
            type="email"
            name="email"
            id="EmailId"
            value={formData.email}
            onChange={handleChange}
            placeholder='Email Id'
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileno">Phone</label>
          <input
          type="text"
          id="mobileno"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
           placeholder='Phone'
        />
        </div>
        
        <div className="form-group">
          <label htmlFor="DateOfBirth">Date of Birth <span>*</span></label>
          <input
          type="date"
          id="DOB"
          name="DOB"
          value={formData.DOB}
          onChange={handleChange}
          required
        />
        </div>
        <div className="form-group">
          <button type="Submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
