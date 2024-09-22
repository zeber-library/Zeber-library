import {React} from "react";
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";
import './Header.css'; // Custom CSS file for additional styles
import logo from '../../assests/logo.png';

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="py-3 custom-navbar">
      <Container fluid>
        {/* Brand Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={logo} // Replace with your logo path
            width="100"
            height="30"
            className="d-inline-block align-top"
            alt="Pangobooks logo"
          />
        </Navbar.Brand>

        {/* Navbar Toggler for mobile view */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        {/* Collapsible Navbar for responsive design */}
        <Navbar.Collapse id="navbarScroll">
          {/* Search Bar and Sell Button */}
          <div className="d-flex flex-column flex-lg-row w-100 align-items-center">
            {/* Search Bar */}
            <Form className="d-flex flex-grow-1 mb-3 mb-lg-0">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{
                  borderRadius: "50px",
                  padding: "10px",
                  boxShadow: "none",
                  border: "1px solid #ddd",
                }}
              />
              <Button variant="outline-light">
                <i className="fa fa-search" style={{ color: "#999" }} />
              </Button>
            </Form>

            {/* Sell Button */}
            <Button 
              variant="primary" 
              className="px-4 mb-3 mb-lg-0 ms-0 ms-lg-3"
              style={{ borderRadius: "50px" }}
            >
              Sell Your Books
            </Button>
          </div>

          {/* Navigation Links */}
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link href="#about" className="me-3">
              About
            </Nav.Link>
            <Nav.Link href="#faq" className="me-3">
              FAQ
            </Nav.Link>
            <Nav.Link href="#wishlist" className="me-3">
              <FaHeart style={{ color: "#999" }} />
            </Nav.Link>
          

<Nav.Link as={Link} to="/cart" className="me-3">
  <FaShoppingBasket style={{ color: "#999" }} />
</Nav.Link>

            <Nav.Link href="#login">
              Log in
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
