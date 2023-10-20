import React, { useEffect, useState, useCallback } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./login.css";
const { rootURL } = require('../../utils/utils');

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { handleLogin } = props;

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = useCallback (async (event) => {
        event.preventDefault();

        if (!username && !password) {
            setErrorMessage('Missing username and password');
            return;
        }
        
        if (!username) {
            setErrorMessage('Missing username');
            return;
        }
        
        if (!password) {
            setErrorMessage('Missing password');
            return;
        }
      
        try {
            const response = await axios.get(`${rootURL}:3000/users`, {
                params: {
                    username: username,
                    password: password
                } 
            });

            const data = response.data;
            if (data.length === 0 || data[0].password !== password || data[0].username !== username) {
                setErrorMessage("Sorry, we don't recognize that combination of username and password. Please try again");
                return;
            }

            const token = Math.random().toString(36).substring(7); // simple token generation

            // Now, you'd want to save this token in your db.json
            await axios.patch(`${rootURL}:3000/users/${data[0].id}`, {
                token: token
            });

            // Save token in local storage or cookie
            localStorage.setItem('userToken', token);
            
            handleLogin(data[0]);
        } catch (err) {
            console.log('error', err.message);
        }
        
    }, [username, password, handleLogin]);

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
        <div className="login-container">
        <h1 className="heading-text">Penn<span className="buzz-text">Connect</span></h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
            <p className="sign-text">Sign In</p>
            <p className="registration-text">
                Or <Link to="/register" className="sign-up-text">Sign Up</Link> to make your own account
            </p>
            <div>
                <label className="inputs-text" htmlFor="username" id="Usernametitle">Username</label>
                <input type="text" className="login-inputs" value={username} id="username" onChange={handleUsernameChange} />
            </div>
            <div>
                <label className="inputs-text" htmlFor="password" id="Passwordtitle">Password</label>
                <input type="password" className="login-inputs" value={password} id="password" onChange={handlePasswordChange} />
            </div>
            <button type="submit" className="login-button">Sign In</button>
        </form>
        </div>
    );
}

export default Login;
