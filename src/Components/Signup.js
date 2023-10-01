/**
 * I want you to make a signup page that ask the user email and password and it will have a sign up button.
 *  (BUT! The signup button will just go straight back to the homepage)
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Css/Signup.css'

function SignupPage({ onSignup }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    alert("You have signed up!");
  };

  return (
    <>
      <div className='mainbox'>
        <div className="loginbox">
          <div className="login">
            <h2>Signup</h2>
            <form>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link to="/">
                <button type="button" onClick={handleSignup}>
                  Signup
                </button>
              </Link>
            </form>
            <div className="links">
              <a href="#">Forget Password</a>
              <a href="/login">Login</a>
            </div>
          </div>
        </div>
        <div className="square">
          <i style={{ '--clr': '#00ff0a' }}></i>
          <i style={{ '--clr': '#ff0057' }}></i>
          <i style={{ '--clr': '#fffd44' }}></i>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
