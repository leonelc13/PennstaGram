import React from 'react';
import './user.css';
import UserPost from './userPost'; 
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

const User= () => {
    const username = "Sunny's page";
    const clickSettings = () => {
        console.log('settings clicked, should be directed to the settings page');
    }

    return ( 
        <div className = "user">
            <div className="userHeader">
                <h1>User Profile</h1>
                <div className="links">
                    <a href="/">Home</a>
                    <a href="/user">User</a>
                    <a href="/user/profile">Profile</a>
                    <a href="/user/settings" onClick = {clickSettings}>Settings</a>
                </div>
                <div className= "profilePic">
                    <img src="https://i.imgur.com/1YBxwXb.jpeg" alt="profile pic" />
                    <h2>{ username }</h2>
                </div>
            </div>
            <div className="userPost">
                <UserPost />
            </div>
        </div>
    );
}

 
export default User;