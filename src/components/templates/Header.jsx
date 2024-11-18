import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Library Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/books">
              Books
            </Nav.Link>
            <Nav.Link as={NavLink} to="/books/add">
              Add Book
            </Nav.Link>
            <Nav.Link as={NavLink} to="/members">
              Members
            </Nav.Link>
            <Nav.Link as={NavLink} to="/members/add">
              Add Member
            </Nav.Link>
            <Nav.Link as={NavLink} to="/borrow">
              Borrow
            </Nav.Link>
            <Nav.Link as={NavLink} to="/return">
              Return
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
