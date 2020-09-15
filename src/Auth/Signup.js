import React, {useState} from 'react';
import './Signup.css';
import firebase from '../firebase/firebase';


const Signup = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  //adding error handling state
  const [error, setError] = useState(null);


  //Global variables
  const {email, password} = credentials;

  //handling changes in inputs

  const handleChange = (e) => {

    let name = e.target.name;
    let value = e.target.value;

    //updating the state and listening to changes on input files
    setCredentials(prevCredentials => {
      return {
        ...prevCredentials,
        [name]: value
      }
    });
  }



  //creating user with email and password, this is a n asyn action
  const handleSubmit = async  (e) => {
    //preventing default behavior of forms
    e.preventDefault();

    //making the request
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        //creating a user collection in order to store the users on it
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
          email
        })
     })
     .catch(function(error) {
  // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  // updating state if error
    setError(errorMessage);
  });



  };




  return <div className="signup__container">

    <div className="signup__form">

     <h2>Sign Up!</h2>
     {error && error}

    <form onSubmit={handleSubmit}>


      <label> Email </label>
      <div className="form_control">

        <input
        type="email"
         name="email"
         placeholder="enter your emial"
         value={email}
         onChange={handleChange}
         required
         />

      </div>

      <label>Password</label>

      <div className="form_control">

        <input
       type="password"
        name="password"
        value={password}
        placeholder="enter your passsword"
        onChange={handleChange}
        required
        />

      </div>


      <button type="submit" className="btn_create">Sign Up!</button>

    </form>



    </div>
  </div>
}

export default Signup;
