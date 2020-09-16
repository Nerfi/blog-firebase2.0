import React,{useContext, useState} from 'react';
import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//importing the context that I created before in order to listen to user auth change
import {AuthContext} from '../../../src/Components/UserContext/AuthContext';
import firebase from '../../firebase/firebase';

const NavbarComponent = ({history}) => {


    //adding state in order to display error message in case there is one
    const [error, setError] = useState(null);

    //using the context that we created before
    const user = useContext(AuthContext);

    //handling log out of a user
    const handleLogOut = () => {
      firebase.auth().signOut()
      .then(() =>{
          // I use replace because I dont want the user to come back to the old page once he logs out, UI experience
          history.replace("/");
      })
      .catch(error => {
        setError(error.message);
      })
    };


  return(
    <>

      <h2>{error && error}</h2>
       <Navbar collapseOnSelect expand="lg" bg="light" >
        <Navbar.Brand href="/">Main page</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/posts">Posts</Nav.Link>
            <Nav.Link href="/create">Create post</Nav.Link>

          </Nav>
          <Nav>

          { !user ? (
              <Nav.Link   href="/signup">Sign up/in</Nav.Link>
            ) : (
               <Nav.Link  onClick={handleLogOut}>logout</Nav.Link>
            )
          }

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
    )


};

export default NavbarComponent;
