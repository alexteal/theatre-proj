/**
 * Home, Blank, Blank, SignUp, Login
 */

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Movie Booking</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/shows">Shows</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <NavDropdown title="Welcome" id="basic-nav-dropdown">
              <NavDropdown.Item href="/edit">Edit Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Purchases</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;





















