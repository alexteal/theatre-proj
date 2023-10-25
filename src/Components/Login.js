import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Css/Login.css';
import {checkUserPassword, checkUserType} from "./Database";
<<<<<<< HEAD
import {AdminPanel,renderContent} from "./AdminPanel";
import {UserPage} from "./UserPage";
=======
>>>>>>> c4ec3d12ffdfe39ce4f15174fc7f99b36836481c

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
<<<<<<< HEAD
    //onLogin();
    if(checkUserPassword(email, password) = true){
      if(checkUserType(email) = true){
        AdminPanel(); //Does this Work?
      } else {
        UserPage(); //Does this also work?
      }
    } else {
      alert("Wrong Email or Password");
=======
    if(checkUserPassword(email, password)){
      if(checkUserType(email)){
        //onLogin(); //Send To Admin Page
      } else {
        //onLogin(); //Send To User Page
      }
    } else {
      alert("Wrong password or email");
>>>>>>> c4ec3d12ffdfe39ce4f15174fc7f99b36836481c
    }
  };

  return (
    <>
      <div className='mainbox'>
        <div className="loginbox">
          <div className="login">
            <h2>Login</h2>
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
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
              </Link>

              <Link to="/AdminPanel">
                <button type="button" onClick={handleLogin}>
                  Admin Panel
                </button>
              </Link>
            </form>
            <div className="links">
              <a href="#">Forget Password</a>
              <a href="/signup">Signup</a>
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

export default LoginPage;