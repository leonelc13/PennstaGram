import React from 'react';
import './user.css';
import UserPost from './userPost'; 
import useFetch from '../useFetch';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const User= (props) => {
    const { username } = useParams();
    const currentUser = props.currentUser;

    // fetch through axios the specific user's profile data by props.id
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);

    // const followerNumRef = useRef(0);
    // const followingNumRef = useRef(0);

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${username}`)
        .then(response => {
            setUser(response.data);
            setLoading(false);
            setError(null);
            setFollowers(response.data.followers);
            setFollowing(response.data.following);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
        })
        
    },[username, currentUser])


    return ( 
        <div className = "user">
            <div className="userHeader">
                <div className="links">
                    <a href="/">Home</a>
                    <Link to = {`/user/settings/${username}`}>Settings</Link>
                </div>
                <div className= "profileData">
                    {/* display the user's profile data including the profile picture and all the post posted by this person*/}
                    { loading && <div>Loading...</div> }
                    { error  && <div>{ error }</div>}
                    <Link to = {`/user/${username}`}>
                        { user && <img className='profilePic' src={user.profile} alt=""/>}
                    </Link>
                    <div className="profileText">
                        <h2 className="username">{username}</h2>
                        <p> Bio </p>
                        { console.log (followers) }
                        { followers === null ? <p> Followers: 0 </p> :
                            <p> Followers: { Object.keys(followers).length } </p>
                        }
                        { following === null? <p> Following: 0 </p> :
                            <p> Following: { Object.keys(following).length } </p>
                        }
                    </div>
                </div>
            </div>
            <div className="userPost">
                <UserPost />
            </div>
        </div>
    );
}

 
export default User;