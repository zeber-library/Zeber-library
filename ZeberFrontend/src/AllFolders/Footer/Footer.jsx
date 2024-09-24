import React from 'react';
import {Link} from "react-router-dom"
import Logo from './images/favicon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faPlus, faMinus, faLink } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faInstagram, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css"



const Footer = () => {
    return (
        <div className="footer-container">
            <footer>
                <div className="intro">
                    <Link tp="/"><img src={Logo} alt="Logo" /></Link>
                    <p>
                        Zeber is a business community based company. It is a fastest growing
                        Business Community that Develops complete solutions for your business.
                    </p>
                </div>

                <div className="address">
                    <input type="checkbox" id="FooterAddress" />
                    <label htmlFor="FooterAddress">
                        <h3>Main Office</h3>
                        <h3>
                            <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faMinus} />
                        </h3>
                    </label>
                    <div className="links">
                        <span className="location">
                            <FontAwesomeIcon icon={faLocationDot} />
                            <span>Sector-22 Rohini, Delhi, India</span>
                        </span>
                        <Link to="mailto:Zeber@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} /> &nbsp;Zeber@gmail.com
                        </Link>
                        <Link to="tel:+918750471736">
                            <FontAwesomeIcon icon={faPhone} /> &nbsp;+91 8750471736
                        </Link>
                        <Link to="tel:+917065273202">
                            <FontAwesomeIcon icon={faPhone} /> &nbsp;+91 7065273202
                        </Link>
                        <Link to="tel:+919818600364">
                            <FontAwesomeIcon icon={faPhone} /> &nbsp;+91 9818600364
                        </Link>
                    </div>
                </div>

                <div className="UsefulLinks">
                    <input type="checkbox" id="FooterLinks" />
                    <label htmlFor="FooterLinks">
                        <h3>Useful Links</h3>
                        <h3>
                            <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faMinus} />
                        </h3>
                    </label>
                    <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/">About</Link>
                        <Link to="/">Services</Link>
                        <Link to="/">Blog</Link>
                        <Link to="/contact-us">Contact</Link>
                    </div>
                </div>

                <div className="SocialMedia">
                    <input type="checkbox" id="FooterMedia" />
                    <label htmlFor="FooterMedia">
                        <h3>Social Media</h3>
                        <h3>
                            <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faMinus} />
                        </h3>
                    </label>
                    <div className="links">
                        <Link to="/">
                            <FontAwesomeIcon icon={faYoutube} /> &nbsp;YouTube
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faInstagram} /> &nbsp;Instagram
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faTwitter} /> &nbsp;Twitter
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faLinkedin} /> &nbsp;LinkedIn
                        </Link>
                        <Link to="mailto:abc@xyz.com">
                            <FontAwesomeIcon icon={faEnvelope} /> &nbsp;E-mail
                        </Link>
                    </div>
                </div>

                <div className="otherWebsites">
                    <input type="checkbox" id="OtherWeb" />
                    <label htmlFor="OtherWeb">
                        <h3>Other Websites</h3>
                        <h3>
                            <FontAwesomeIcon icon={faPlus} /> <FontAwesomeIcon icon={faMinus} />
                        </h3>
                    </label>
                    <div className="links">
                        <Link to="/">
                            <FontAwesomeIcon icon={faLink} /> &nbsp;E-Library
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faLink} /> &nbsp;Job Portal
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faLink} /> &nbsp;Events
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faLink} /> &nbsp;Startup Services
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faLink} /> &nbsp;Investor Portal
                        </Link>
                    </div>
                </div>

                <div className="social">
                    <h3>Social</h3>
                    <div className="links">
                        <Link to="/">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                        <Link to="/">
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                    </div>
                </div>
            </footer>
            <div className="rights" >
                <span>
                    © 2024 All Rights Reserved by &nbsp;
                    <a href="https://zeber.in" target="_blank" rel="noopener noreferrer">
                        Zeber
                    </a>
                </span>
            </div>
        </div>
    );
};

export default Footer;
