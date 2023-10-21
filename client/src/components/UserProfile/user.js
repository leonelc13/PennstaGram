import React from 'react';
import './user.css';
import UserPost from './userPost'; 
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Follow from '../Follow/Follow';

const User= (props) => {
    const { username } = useParams();
    const currentUser = props.currentUser;
    let notUser = (currentUser !== username);

    // fetch through axios the specific user's profile data by props.id
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

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
        
        // if (currentUser === username){
        //     setIsFollowing(true);
        // }
        if (followers !== null) {
            setIsFollowing(followers.includes(currentUser));
        } else {
            if (currentUser !== username){
            setIsFollowing(false);}
        }

    },[username, currentUser])

    const handleFollow = async () => {
        // axios call get the current user's data, add this user to the following list and for this user add current user to its follower list
        try {
            const response = await axios.get(`http://localhost:3000/users/${currentUser}`);
            let currentUserData= response.data;
            const currentUserFollowing = currentUserData.following;
            currentUserFollowing.push(username);
            currentUserData.following = currentUserFollowing;
            user.followers.push(currentUser);

            await axios.put(`http://localhost:3000/users/${currentUser}`, 
                currentUserData);
            await axios.put(`http://localhost:3000/users/${username}`, user);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const handleUnfollow = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${currentUser}`);
            let currentUserData= response.data;
            const currentUserFollowing = currentUserData.following;

            var index = currentUserFollowing.indexOf(username);
            if (index > -1) {
                currentUserFollowing.splice(index, 1);
            }
            currentUserData.following = currentUserFollowing;

            var follower_index = user.followers.indexOf(currentUser);
            if (follower_index > -1) {
                user.followers.splice(follower_index, 1);
            }
            
            await axios.put(`http://localhost:3000/users/${currentUser}`, 
                currentUserData);

            await axios.put(`http://localhost:3000/users/${username}`, user);

            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }


    return ( 
        <div className = "user">
            <div className="userHeader">
                <div className="links">
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
                        { followers === null ? <p> Followers: 0 </p> :
                            <p> Followers: { Object.keys(followers).length } </p>
                        }
                        { following === null? <p> Following: 0 </p> :
                            <p> Following: { Object.keys(following).length } </p>
                        }
                        { notUser?
                        <> 
                        { isFollowing ? <button onClick = { handleUnfollow }> unfollow </button> : <button onClick={ handleFollow }> Follow </button>}
                        </>
                        : <> </> }

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