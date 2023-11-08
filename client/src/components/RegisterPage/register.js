import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";
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

    
    const registerSubmit = (event) => handleSubmit(event, (username, password, setErrorMessage) => {
        tryRegister(username, password, setErrorMessage, navigate);
    });


    return (
        <div className='register-container'>
        <h1 className='header-text'>Penn<span className="Buzz">Connect</span></h1>
        {errorMessage && <p className='error-text'>{errorMessage}</p>}
        <form className="register-form" onSubmit={registerSubmit}>
            <p className="title-text">Sign Up</p>
            <p className="login-text">
            Or <Link to="/login" className='url-text'>Sign In</Link> to your account
            </p>
            <div>
            <label className='titles-text' htmlFor="username" id='user2'>Pick a Username</label>
            <input type="text" value={username} id="username" className="input-edits" onChange={handleUsernameChange} />
            </div>
            <div>
            <label className='titles-text' htmlFor='password' id='password2'>Pick a Password</label>
            <input type="password" value={password} id="password" className="input-edits" onChange={handlePasswordChange} />
            </div>
            <button type="submit" className='btn-edits'>Sign Up</button>
        </form>
        </div>
    );
}

export default Register;