import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { tryRegister } from '../../api/users';
import { useUserAuth } from '../../utils/AuthContainer';

function Register() {
  const {
    username,
    password,
    errorMessage,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
  } = useUserAuth();
  const navigate = useNavigate();

  const [showUsernameTooltip, setShowUsernameTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  const handleUsernameFocus = () => setShowUsernameTooltip(true);
  const handleUsernameBlur = () => setShowUsernameTooltip(false);
  const handlePasswordFocus = () => setShowPasswordTooltip(true);
  const handlePasswordBlur = () => setShowPasswordTooltip(false);

  const registerSubmit = (event) => handleSubmit(event, tryRegister, [navigate]);
  return (
    <div className="register-container">
      <h1 className="header-text">
        Penn
        <span className="Buzz">Connect</span>
      </h1>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      <form className="register-form" onSubmit={registerSubmit}>
        <p className="title-text">Sign Up</p>
        <p className="login-text">
          Or
          {' '}
          <Link to="/login" className="url-text">Sign In</Link>
          {' '}
          to your account
        </p>
        <div className="input-container">
          <label className="titles-text" htmlFor="username" id="user2">
            Pick a Username
            <input
              type="text"
              value={username}
              id="username"
              className="input-edits"
              onChange={handleUsernameChange}
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
            />
            {showUsernameTooltip && (
              <div className="tooltip">
                <ul>
                  <li>Minimum length of 5 characters</li>
                  <li>Maximum length of 10 characters</li>
                  <li>Cannot start with a letter</li>
                </ul>
              </div>
            )}
          </label>
        </div>
        <div className="input-container">
          <label className="titles-text" htmlFor="password" id="password2">
            Pick a Password
            <input
              type="password"
              value={password}
              id="password"
              className="input-edits"
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
            {showPasswordTooltip && (
              <div className="tooltip">
                <ul>
                  <li>Minimum length of 5 characters</li>
                  <li>Maximum length of 10 characters</li>
                  <li>At least one special character or number</li>
                </ul>
              </div>
            )}
          </label>
        </div>
        <button type="submit" className="btn-edits">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
