import React, {useState} from 'react';
import './SignIn.css';

const SignIn = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
    //global variables
  const {email, password} = credentials;

  //onchange handler
  const handleChange = (e) => {
    //targeting user inputs for email and password
    let name = e.target.name;
    let value = e.target.value;

    //updating state with user inputs
    setCredentials(prevCredentials => {
      return {
        ...prevCredentials,
        [name]: value
      }
    });


  }

  return <div className="signIn__container">

    <form onSubmit={"here goes a function"} className="signIn__form">

      <label>Email</label>

      <div className="input__email">
        <input
        type="email"
        name="email"
        value={email}
        placeholder="Enter you email"
        autoComplete="true"
        onChange={handleChange}
        />

      </div>

      <label> Password</label>

      <div className="input__password">
        <input
         type="password"
         name="password"
         value={password}
         autoComplete="off"
         placeholder="Enter your password"
         onChange={handleChange}
        />
      </div>


    </form>
  </div>
};

export default SignIn;
