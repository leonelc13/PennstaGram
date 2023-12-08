import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { tryLogin } from '../../api/users';
import { useUserAuth } from '../../utils/AuthContainer';

function Login(props) {
  const {
    username,
    password,
    errorMessage,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit,
  } = useUserAuth();

  const { handleLogin } = props;

  const loginSubmit = (event) => {
    handleSubmit(event, tryLogin, [handleLogin]);
  };

  return (
    <div className="login-container">
      <h1 className="heading-text">
        Penn
        <span className="buzz-text">Connect</span>
      </h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form className="login-form" onSubmit={loginSubmit}>
        <p className="sign-text">Sign In</p>
        <p className="registration-text">
          Or
          {' '}
          <Link to="/register" className="sign-up-text">Sign Up</Link>
          {' '}
          to make your own account
        </p>
        <div className="input-wrapper">
          <label className="inputs-text" htmlFor="username" id="Usernametitle">
            Username
            <input type="text" className="login-inputs" value={username} id="username" onChange={handleUsernameChange} />
          </label>
        </div>
        <div className="input-wrapper">
          <label className="inputs-text" htmlFor="password" id="Passwordtitle">
            Password
            <input type="password" className="login-inputs" value={password} id="password" onChange={handlePasswordChange} />
          </label>
        </div>
        <button type="submit" className="login-button">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
