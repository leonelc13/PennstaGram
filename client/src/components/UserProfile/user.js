import React from 'react';
import './user.css';
import UserPost from './userPost'; 
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';

const User= () => {
    const { user } = useParams();

    const username = `${user}'s Profile`;
    const clickSettings = () => {
        console.log('settings clicked, should be directed to the settings page');
    }

    return ( 
        <div className = "user">
            <div className="userHeader">
                <h1> { username } </h1>
                <div className="links">
                    <a href="/">Home</a>
                    <Link to="/user">User</Link>
                    <Link to="/user/profile">Profile</Link>
                    <Link to="/user/settings" onClick = {clickSettings}>Settings</Link>
                </div>
                <div className= "profilePic">
                    <img src="https://i.imgur.com/1YBxwXb.jpeg" alt="profile pic" />
                </div>
            </div>
            <div className="userPost">
                <UserPost />
            </div>
        </div>
    );
}

 
export default User;