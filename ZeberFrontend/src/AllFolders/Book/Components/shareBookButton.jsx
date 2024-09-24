import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLink, FaInstagram } from "react-icons/fa";


const shareBookButton = ({ shareBook, setShareBook }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const currentUrl = window.location.href; // Get the current URL
  const handleCopyLink = () => {
    // Copy the current page URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
  };


  return (
    <div
      className={`share-popup ${shareBook ? "visible" : ""}`}
      style={{
        display: shareBook ? "flex" : "none",
      }}
    >
      <div className="share-popup-content">
        <div className="popup-header">
          <h2>Share this Book</h2>
          <button className="close-popup" onClick={() => setShareBook(false)}>
            &times;
          </button>
        </div>

        {/* Social Media Links */}
        <div className="shareSection">
          <span>Share this via link</span>
          <div className="share-options">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon"
            >
              <FaFacebook />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon"
            >
              <FaTwitter />
            </a>
            <a
              href={`https://wa.me/?text=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon"
            >
              <FaWhatsapp />
            </a>
            <a
              href={`https://wa.me/?text=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Link Input and Copy Button */}
          <div className="copy-link-container">
            <div className="input">

              <FaLink />
              <input
                type="text"
                value={currentUrl}
                readOnly
                className="share-url-input"
              />
            </div>
            <button onClick={handleCopyLink} className="copy-link-button">
              {copySuccess ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default shareBookButton;