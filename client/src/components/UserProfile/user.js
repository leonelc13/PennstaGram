import React from 'react';
import './user.css';
import UserPost from './userPost'; 
import useFetch from '../useFetch';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const User= (props) => {
    const { username } = useParams();
    const userId = props.userId

    // fetch through axios the specific user's profile data by props.id
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`)
        .then(response => {
            setUser(response.data);
            setLoading(false);
            setError(null);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        })
    })


    return ( 
        <div className = "user">
            <div className="userHeader">
                <div className="links">
                    <a href="/">Home</a>
                    <Link to="/user/settings">Settings</Link>
                </div>
                <div className= "profileData">
                    {/* display the user's profile data including the profile picture and all the post posted by this person*/}
                    { loading && <div>Loading...</div> }
                    { error  && <div>{ error }</div>}
                    <Link to = {`/user/${username}`}>
                        { user && <img className='profilePic' src={user.profile} alt=""/>}
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