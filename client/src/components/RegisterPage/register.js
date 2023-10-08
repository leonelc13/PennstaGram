import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";
import axios from "axios";
const { rootURL } = require('../../utils/utils');

function Register(props) {
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

        try {
            const response = await axios.get('http://localhost:3000/users');
            const data = response.data;

            if (data.find((user) => user.username === username)) {
                setErrorMessage('Username is already taken');
                return;
            }

            const postResponse = await axios.post(`${rootURL}:3000/users`, `username=${username}&password=${password}`);

            const postData = postResponse.data;

            if (postData.error) {
                setErrorMessage(postData.error);
                return;
            }

            navigate('/login');

        } catch (err) {
            setErrorMessage(err.response.data.error);
            console.log('error', err.message);
        }

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
        <h1 className='header-text'>Penn<span className="Buzz">Buzz</span></h1>
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