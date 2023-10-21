import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './header.css'
/**
 * React Component for Header displayed to a logged in user
 **/


function Header(props) {
    const currentUser = props.user;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleLogout = () => {
        props.handleLogout();
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${currentUser}`)
        .then(response => {
            setUser(response.data);
            setLoading(false);
            setError(null);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        })
    },[currentUser])


    return (
        <div id="header-container">
            <span id="pennbuzz-name">
                <Link to="/">
                    Penn
                    <span id="buzz-name">
                        Connect
                    </span>
                </Link>
            </span>
            <input type="text" id="search-input" placeholder="Search for Users"></input>
            <span className="navbar-text">
                <Link to="/">
                    Main Activity
                </Link >
            </span>
            <span className="navbar-text">
                <Link to="/chat">
                    Chats
                </Link>
            </span>
            <span className="navbar-text">
                <Link to="/createpost">
                    Create Post
                </Link>
            </span>
            <span id="user-profile-picture-wrapper">
                <Link to={`/user/${currentUser}`} >
                    { loading && <div>Loading...</div> }
                    { error  && <div>{ error }</div>}
                    { user && <img src={user.profile} alt=" profile-pic"></img>}
                </Link>
            </span>

            <button onClick={handleLogout} className='logout_button'>Logout</button>

        </div >
    );
}
export default Header;
