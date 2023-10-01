import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Css/Login.css';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    //onLogin();
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