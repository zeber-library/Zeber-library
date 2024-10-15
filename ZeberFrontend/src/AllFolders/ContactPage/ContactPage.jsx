import React from 'react';

import './styles.css'; 
import Header from "./Header";
import Footer from '../Footer/Footer';



const ContactPage = () => {
  return (
    <div className='contact-page-container'>
      {/* Navbar */}
      <Header/>

      {/* Contact Header Section */}
      <div className="contact-header">
        <div className="header-content">
          <h1>Contact</h1>
          <p>Let's start something great together. Get in touch with one of the team leaders!</p>
          <div className="profile-images">
            <img src="/Header-images/images/PROFILE1.jpeg" alt="Profile 1" />
            <img src="/Header-images/images/profile2.jpeg" alt="Profile 2" />
            <img src="/Header-images/images/profile3.jpeg" alt="Profile 3" />
          </div>
        </div>

        {/* Heart Shape Image */}
        <img src="/Header-images/images/heart.png" alt="Heart Outline" className="heart-outline" />

        {/* SVG Wave */}
        <div className="wave">
          <svg viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,202.7C96,181,192,139,288,133.3C384,128,480,160,576,170.7C672,181,768,171,864,144C960,117,1056,75,1152,80C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-board">
        <div className="contact-card left-card">
          <h2>Get in Touch</h2>
          <p><strong>Visit us:</strong> Company Address</p>
          <p><strong>Visit us:</strong> Company Address</p>
          <p><strong>Visit us:</strong> Company Address</p>
          <p><strong>Visit us:</strong> Company Address</p>
          <p><strong>Chat to us:</strong> <a href="mailto:contact@company.com">contact@company.com</a></p>
          <p><strong>Call us:</strong> (123) 456-7890<br />Working Hours: Mon-Fri<br />9am-6pm</p>
          <div className="social-media">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          <img src="/Header-images/images/file (2).png" alt="Cartoon holding the card" className="cartoon_holder1" />
        </div>
        <div className="contact-card right-card">
          <h2>Contact Form</h2>
          <form>
            <label htmlFor="first-name">First Name:</label>
            <input type="text" id="first-name" name="first-name" required />

            <label htmlFor="last-name">Last Name:</label>
            <input type="text" id="last-name" name="last-name" required />

            <label htmlFor="company-name">Company Name:</label>
            <input type="text" id="company-name" name="company-name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <label>
              <input type="checkbox" name="info" required /> I agree to receive more information about the company.
            </label>
            <a href="#">Privacy Policy</a>

            <button type="submit">Send Message</button>
          </form>
        </div>
        <img src="/Header-images/images/file.png" alt="Cartoon holding the card" className="cartoon-holder" />
      </div>

      {/* Additional Cards Section */}
      <div className="additional-cards">
        {/* First Card */}
        <div className="info-card">
          <img src="/Header-images/images/sales.jpeg" alt="Profile Image" className="card-image" />
          <h2>Talk to a member of our Sales team.</h2>
          <p>We'll help you find the right products and pricing for our business.</p>
          <a href="#" className="card-button">Contact Us</a>
        </div>

        {/* Second Card */}
        <div className="info-card">
          <img src="/Header-images/images/robo.jpeg" alt="Profile Image" className="card-image" />
          <h2>Product and account support.</h2>
          <p>Our help center is fresh and always open for business. If you can't find the answer you're looking for, we're here to lend a hand.</p>
          <a href="#" className="card-button">Go to the help center</a>
        </div>
      </div>


     {/*Footer component  */}
     <Footer/>
     
    </div>
  );
};

export default ContactPage;
