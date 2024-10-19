import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0070f2', padding: '40px 0', color: 'white' }}>
      <Container>
        <Row>
          <Col md={3} style={{ marginBottom: '30px' }}>
            <h5>Shop</h5>
            <ul style={{ listStyleType: 'none', padding: 0, fontSize: '18px', lineHeight: '2.5' }}>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Bookstores</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Collections</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Categories</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Authors</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Shelves</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Series</a></li>
            </ul>
          </Col>

          <Col md={3} style={{ marginBottom: '30px' }}>
            <h5>Sell</h5>
            <ul style={{ listStyleType: 'none', padding: 0, fontSize: '18px', lineHeight: '2.5' }}>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Sellers Resource Hub</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Ambassador</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Market Guide</a></li>
            </ul>
          </Col>

          <Col md={3} style={{ marginBottom: '30px' }}>
            <h5>Company</h5>
            <ul style={{ listStyleType: 'none', padding: 0, fontSize: '18px', lineHeight: '2.5' }}>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Blog</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Careers</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Trust and Safety</a></li>
            </ul>
          </Col>

          <Col md={3} style={{ marginBottom: '30px' }}>
            <h5>Help</h5>
            <ul style={{ listStyleType: 'none', padding: 0, fontSize: '18px', lineHeight: '2.5' }}>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Help Center</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
              <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>PangoBucks FAQ</a></li>
            </ul>
          </Col>
        </Row>

        <Row className="mt-4 text-center ">
          <Col md={12}>
            <p >© PangoBooks 2024. All rights reserved.</p>
            <a href="#" style={{ color: 'white', textDecoration: 'none', marginRight: '10px'}}>Terms of Use</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none'}}>Privacy Policy</a>
          </Col>

          {/* <Col md={6} className="text-md-end">
            <a href="#" style={{ marginRight: '10px' }}>
              <img src="https://via.placeholder.com/150x50" alt="App Store" />
            </a>
            <a href="#">
              <img src="https://via.placeholder.com/150x50" alt="Google Play" />
            </a>
          </Col> */}
        </Row>

        <Row className="mt-4 text-center">
          <Col>
            <a href="#" style={{ color: 'white', marginRight: '15px' }}>
              <FaFacebook size={24} />
            </a>
            <a href="#" style={{ color: 'white', marginRight: '15px' }}>
              <FaTwitter size={24} />
            </a>
            <a href="#" style={{ color: 'white', marginRight: '15px' }}>
              <FaInstagram size={24} />
            </a>
            <a href="#" style={{ color: 'white', marginRight: '15px' }}>
              <FaYoutube size={24} />
            </a>
            <a href="#" style={{ color: 'white' }}>
              <FaTiktok size={24} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;