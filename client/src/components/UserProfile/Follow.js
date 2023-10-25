import React from 'react';
import { followUser, unfollowUser } from '../../api/users';

const FollowButton = (props) => {
    const currentUser = props.currentUser;
    const targetUser = props.targetUser;
    const isFollowing = props.isFollowing;

    const handleFollow = async () => {
        async function followWrapper(){
            await followUser(currentUser, targetUser);
            props.setIsFollowing(true);
        }
        followWrapper();
    }

    const handleUnfollow = async () => {
        
        async function unfollowWrapper(){
            await unfollowUser(currentUser, targetUser);
            props.setIsFollowing(false);
        }
        unfollowWrapper();
    }

    if (isFollowing) {
        return (<button onClick={handleUnfollow} id="unfollowButton">Unfollow</button>);
    } else {
        return (<button onClick={handleFollow} id="followButton">Follow</button>);
    }
}
 
export default FollowButton;