import React from 'react';
import './App.css';
import NavbarComponent from './Components/UI/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router, Route, Link , Switch } from "react-router-dom";
import Posts from './Components/Posts';
import CreatePost from './Components/CreatePost';


function App() {
  return (
    <div className="App">
      <NavbarComponent/>

      <Router>
      <Switch>

        <Route path="/posts"  component={Posts} />
        <Route path="/create"  component={CreatePost} />

        <Route path="/" exact component={LandingPage} />

        </Switch>
      </Router>


    {/* TO DO

      5- Sign in/ sign up/log out
      6 - single Post component , params and stuff like taht

    */}
    </div>
  );
}

export default App;
