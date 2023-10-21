
import React from 'react';
import './Follow.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Follow(props) {
    const { username } = useParams();
    const currentUser = props.currentUser;
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
            <button onClick = { handleUnfollow }> unfollow </button> : <button onClick={ handleFollow }> Follow </button>);
}
export default Follow