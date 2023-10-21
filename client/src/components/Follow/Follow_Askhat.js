/* eslint-disable */
import React from 'react';
import './Follow.css'

function Follow({ currentUser, profileUser }) {
  const isFollowing = currentUser?.following.includes(profileUser?.username);

  const handleFollowToggle = () => {
    let updatedCurrentUserFollowing;
    let updatedProfileUserFollowers;

    if (isFollowing) {
      // If currently following, then unfollow
      updatedCurrentUserFollowing = currentUser?.following.filter(
        username => username !== profileUser?.username
      );
      updatedProfileUserFollowers = profileUser?.followers.filter(
        username => username !== currentUser?.username
      );
    } else {
      // If not currently following, then follow
      updatedCurrentUserFollowing = [...currentUser?.following, profileUser?.username];
      updatedProfileUserFollowers = [...profileUser?.followers, currentUser?.username];
    }

    // Update the current user's following list
    fetch(`http://localhost:3001/users/${currentUser?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ following: updatedCurrentUserFollowing })
    })
    .then(() => {
      // Once that's done, update the profile user's followers list
      return fetch(`http://localhost:3001/users/${profileUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ followers: updatedProfileUserFollowers })
      });
    })
    .then(() => {
      // After both updates, refresh the page or set the state elsewhere to show the updated data
      window.location.reload();
    });
  };

  return (
    <button onClick={handleFollowToggle} data-following={isFollowing}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default Follow;