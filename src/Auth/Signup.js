import React, {useState} from 'react';
import './Signup.css';

const Signup = () => {

  const [credentials, setCredentials] = useState({
    email: '',
    passsword: ''
  });

  return <div className="signup__container">

    <div className="signup__form">
    <p>over here should place  alogo I guess</p>
    <h2>Sign Up!</h2>

    <form>


    <label> Email </label>
    <div className="form_control">
      <input type="email" name="email" placeholder="enter your emial" required/>

    </div>

    <label>Password</label>

    <div className="form_group">

      <input type="Password" name="Password" placeholder="enter your passsword" required/>

    </div>


    <button type="submit" className="btn_create">Sign Up!</button>

    </form>



    </div>
  </div>
}

export default Signup;
