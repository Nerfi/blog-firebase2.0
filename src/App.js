import React from 'react';
import './App.css';
import NavbarComponent from './Components/UI/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './Components/LandingPage';


function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <LandingPage/>


    {/* TO DO

      2-landing page component
      3-Posts componentn
      4-Create post component
      5- Sign in/ sign up/log out
      6 - single Post component , params and stuff like taht

    */}
    </div>
  );
}

export default App;
