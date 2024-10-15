import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Address.css";

const AddressForm = () => {
  const userId = "66ddfda258de85a04f9880fb"; // Replace with dynamic user ID

  // State to hold multiple addresses (max 5)
  const [addresses, setAddresses] = useState([]);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(null); // Track the default address
  const addressLimit = 5;

  // State to control form visibility and edit mode
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // To track if we're editing an address

  // State for the current form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postcode: "",
    mobile: "",
  });

  const countries = [{ name: "India", flag: "🇮🇳", code: "+91" }];

  // fetch addresses from the database

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/addresses/get?ID=${userId}`
        );

        setAddresses(response.data.AddressLine);
      } catch (error) {
        console.error("Error fetching addresses", error);
        alert(
          "Error fetching addresses: " +
            (error.response.data.message || error.message)
        );
      }
    };
    fetchAddresses();
  }, []);

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editIndex !== null) {
        // Update an existing address
        response = await axios.post(
          "http://localhost:3000/api/v1/addresses/update",
          {
            ID: userId,
            index: editIndex, // Pass the index of the address to update
            AddressLine: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              AddressLine1: formData.address,
              City: formData.city,
              State: formData.state,
              Country: formData.country,
              PostalCode: formData.postcode,
              Phone: formData.mobile,
            },
          }
        );

        setEditIndex(null); // Clear edit mode

        // alert("Address updated successfully!");
        window.location.reload();
      } else {
        // Add a new address
        response = await axios.post(
          "http://localhost:3000/api/v1/addresses/add",
          {
            ID: userId,
            AddressLine: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              AddressLine1: formData.address,
              City: formData.city,
              State: formData.state,
              Country: formData.country,
              PostalCode: formData.postcode,
              Phone: formData.mobile,
            },
          }
        );

        // alert("Address added successfully!");
        window.location.reload();
      }

      // Reset the form after submission
      setFormData({
        firstName: "",
        lastName: "",
        mobile: "",
        state: "",
        country: "India",
        address: "",
        city: "",
        postcode: "",
      });
    } catch (error) {
      console.error("Error processing form", error);
      alert(
        "Error processing form: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    setEditIndex(null); // Reset edit mode
  };

  // Delete an address by index
  const handleDelete = async(index) => {
  
    try{
            await axios.patch("http://localhost:3000/api/v1/addresses/delete", {
            ID: userId,
            index: index,
        });
        // alert("Address deleted successfully!");
        window.location.reload();
    }catch(error){
        console.error("Error deleting address", error);
        alert("Error deleting address: " + (error.response?.data?.message || error.message));
    }

    // If the deleted address was the default address, reset the default address index
    if (index === defaultAddressIndex) {
      setDefaultAddressIndex(null);
    }
  };

  // Edit an address by index (populate form and toggle form visibility)
  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditIndex(index);
    setShowForm(true); // Show the form for editing
  };

  // Set an address as the default
  const handleSetDefault = (index) => {
    setDefaultAddressIndex(index);
  };

  return (
    <div className="Address">
      <div className="heading">
        <h2>ADD NEW ADDRESS</h2>
        {/* Button to toggle form visibility */}
        <button
          onClick={toggleForm}
          className="toggle-form-button"
          disabled={addresses.length >= addressLimit}
        >
          {showForm ? "Hide Form" : "Add New Address"}
        </button>
        <p>
          You currently have {addresses.length === 0 ? "no" : addresses.length}{" "}
          saved address{addresses.length !== 1 ? "es" : ""}. You can add up to 5
          addresses.
        </p>
      </div>

      {/* Form to add/edit an address */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="FirstName">FIRST NAME:</label>
            <input
              type="text"
              name="firstName"
              id="FirstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              maxLength={12} // Limit input to 12 characters
            />
          </div>

          <div className="form-group">
            <label htmlFor="LastName">LAST NAME:</label>
            <input
              type="text"
              name="lastName"
              id="LastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              maxLength={12} // Limit input to 12 characters
            />
          </div>

          <div className="form-group">
            <label htmlFor="Mobile">MOBILE:</label>
            <div className="phone-input">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country.code}>
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="mobile"
                id="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                maxLength={10} // Limit to 10 digits
                pattern="\d*"
                placeholder="Mobile Number"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="Country">COUNTRY:</label>
            <select
              name="country"
              id="Country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Country
              </option>
              <option value="India">India</option>
              <option value="other">other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="Address">ADDRESS:</label>
            <input
              type="text"
              name="address"
              id="Address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="City">CITY:</label>
            <input
              type="text"
              name="city"
              id="City"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="State">STATE:</label>
            <input
              type="text"
              name="state"
              id="State"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Postcode">PinCode:</label>
            <input
              type="text"
              name="postcode"
              id="Postcode"
              value={formData.postcode}
              onChange={handleChange}
              required
              pattern="\d*" // Allow only numbers
              maxLength={6} // Limit to 6 digits
              placeholder="Pin code"
            />
          </div>

          <div className="form-group">
            <button type="submit">
              {editIndex !== null ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
            </button>
          </div>
        </form>
      )}

      {/* Render all submitted addresses */}
      <div className="addresses-list">
        {addresses.length > 0 ? (
          addresses.map((address, index) => {
            return (
              <div key={index} className="submitted-address-box">
                <h4>Address {index + 1}</h4>
                <p>
                  {address.firstName} {address.lastName}
                </p>
                <p> {address.Phone}</p>
                <p>
                  {address.AddressLine1}, {address.City}, {address.Country},{" "}
                  {address.PostalCode}
                </p>

                {/* Edit, Delete, and Set Default Buttons */}
                <div className="correct">
                  <span onClick={() => handleEdit(index)}>
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                  <span onClick={() => handleDelete(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </div>

                {/* Set Default Address Button */}
                {defaultAddressIndex === index ? (
                  <p className="DetaultAddress">Default Address</p>
                ) : (
                  <button onClick={() => handleSetDefault(index)}>
                    Set as Default
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="NoAddress">No Address Available</p> // Display this message if no addresses are available
        )}
      </div>
    </div>
  );
};

export default AddressForm;
