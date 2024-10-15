import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './Navbar.css'

const CategoriesNav = () => {
  return (
    <Navbar bg="light" expand="lg" className="py-2 navbar-items">
      <Container>
        <Navbar.Toggle aria-controls="categories-navbar" />
        <Navbar.Collapse id="categories-navbar">
          <Nav className="mx-auto nav-categories">
            <Nav.Link href="#young-adult">Young Adult</Nav.Link>
            <Nav.Link href="#fantasy">Fantasy</Nav.Link>
            <Nav.Link href="#scifi">Sci-Fi</Nav.Link>
            <Nav.Link href="#thrillers">Thrillers</Nav.Link>
            <Nav.Link href="#romance">Romance</Nav.Link>
            <Nav.Link href="#comics">Comics</Nav.Link>
            <Nav.Link href="#historical-fiction">Historical Fiction</Nav.Link>
            <Nav.Link href="#biography">Biography</Nav.Link>
            <Nav.Link href="#kids-books">Kids' Books</Nav.Link>
            <Nav.Link href="#history">History</Nav.Link>
            

            {/* Dropdown for more categories */}
            <NavDropdown title="More Categories" id="categories-dropdown">
              <NavDropdown.Item href="#category1">Category 1</NavDropdown.Item>
              <NavDropdown.Item href="#category2">Category 2</NavDropdown.Item>
              <NavDropdown.Item href="#category3">Category 3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CategoriesNav;
