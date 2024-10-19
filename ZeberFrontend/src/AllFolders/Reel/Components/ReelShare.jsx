import React from "react";
import "./ReelShare.css"; // Create a CSS file for styling
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CancelIcon from '@mui/icons-material/Cancel';
const ShareModal = ({ isOpen, onClose, url }) => {
  const whatsappURL = `https://api.whatsapp.com/send?text=Check out this reel: ${encodeURIComponent(url)}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitterURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check out this reel!`;
  const linkedinURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const handleShare = (platform) => {
    window.open(platform, '_blank');
    onClose(); // Close modal after sharing
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="shareMedia">
          <WhatsAppIcon  onClick={() => handleShare(whatsappURL)} style={{color:"green",fontSize:'2.5rem',height:'2rem',width:'2rem'}}/>
          <FacebookIcon  onClick={() => handleShare(facebookURL)} style={{color:"blue",fontSize:'2.5rem',height:'2rem',width:'2rem'}}/>    
             <XIcon  onClick={() => handleShare(twitterURL)} style={{color:"black",fontSize:'2.5rem',height:'2rem',width:'2rem'}}/>
          <LinkedInIcon  onClick={() => handleShare(linkedinURL)} style={{color:"blue",fontSize:'2.5rem',height:'2rem',width:'2rem'}}/>

        </div>
        <CancelIcon onClick={onClose} style={{position:"relative",top:'-1.4rem',left:'-.8rem',color:'red'}}/>
      </div>
      
    </div>
  );
};

export default ShareModal;
