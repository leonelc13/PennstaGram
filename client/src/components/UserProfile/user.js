import React from 'react';
import './user.css';
import UserPost from './userPost'; 
import useFetch from '../useFetch';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';

const User= () => {
    const { username } = useParams();
    console.log(username);

    const clickSettings = () => {
        console.log('settings clicked, should be directed to the settings page');
    }
    
    const {data: user, isLoading, error} = useFetch(`http://localhost:3000/users/${username}`);


    return ( 
        <div className = "user">
            <div className="userHeader">
                <div className="links">
                    <a href="/">Home</a>
                    <Link to="/user/settings" onClick = {clickSettings}>Settings</Link>
                </div>
                <div className= "profileData">
                    { isLoading && <div>Loading...</div> }
                    { error && <div>{ error }</div>}
                    <Link to = {`/user/${username}`}>
                        { user && <img className='profilePic' src={user.profile} alt="" />}
                    </Link>
                    {/* <img src="https://i.imgur.com/1YBxwXb.jpeg" alt="profile pic" /> */}
                </div>
            </div>
            <div className="userPost">
                <UserPost />
            </div>
        </div>
    );
}

 
export default User;