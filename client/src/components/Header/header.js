import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'
/**
 * React Component for Header displayed to a logged in user
 **/


function Header(props) {
    const handleLogout = () => {
        props.handleLogout();
    }

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
                <Link to="/leaderboard">
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
                <Link to={`/profile`} >
                    <img src={props.user_profile_picture} alt=" profile-pic"></img>
                </Link>
            </span>

            <button onClick={handleLogout} className='logout_button'>Logout</button>

        </div >
    );
}
export default Header;
