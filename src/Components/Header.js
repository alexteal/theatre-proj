/**
 * Home, Blank, Blank, SignUp, Login
 */

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from './Login';

function Header(props) {
  const handleLogout = () => {
    props.setIsLoggedIn(false);
  };


  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Movie Booking</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/shows">Shows</Nav.Link>
            {!props.isLoggedIn && (
              <>
                <Nav.Link href="/signup">Signup</Nav.Link> 
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
            {props.isLoggedIn && (
              <NavDropdown title="Welcome" id="basic-nav-dropdown">
                <NavDropdown.Item href="/edit">Edit Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Purchases</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;





















