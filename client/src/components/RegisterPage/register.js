import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";
import { tryRegister } from '../../api/users';
// import axios from "axios";
// const { rootURL } = require('../../utils/utils');

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = useCallback (async (event) => {
        event.preventDefault();

        if (!username && !password) {
            setErrorMessage('Please enter both a username and password');
            return;
          }
        
        if (!username) {
            setErrorMessage('Please enter a username');
            return;
        }
        
        if (!password) {
            setErrorMessage('Please enter a password');
            return;
        }

        tryRegister(username, password, setErrorMessage, navigate);

    }, [username, password, navigate]);

    useEffect(() => {
        const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
        document.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleSubmit]);

    return (
        <div className='register-container'>
        <h1 className='header-text'>Penn<span className="Buzz">Connect</span></h1>
        {errorMessage && <p className='error-text'>{errorMessage}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
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