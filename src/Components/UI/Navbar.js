import React from 'react';
import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavbarComponent = () => {

  return(
 <Navbar collapseOnSelect expand="lg" bg="light" >
  <Navbar.Brand href="/">Main page</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/posts">Posts</Nav.Link>
      <Nav.Link href="/create">Create post</Nav.Link>

    </Nav>
    <Nav>
      <Nav.Link href="#deets">Sign up/in</Nav.Link>

    </Nav>
  </Navbar.Collapse>
</Navbar>
)


};

export default NavbarComponent;
