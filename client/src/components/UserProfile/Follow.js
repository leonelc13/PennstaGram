import React from 'react';
import { followUser, unfollowUser, getUserById} from '../../api/users';

const FollowButton = (props) => {
    const currentUser = props.currentUser;
    const targetUser = props.targetUser;
    const isFollowing = props.isFollowing;

    const handleFollow = async () => {
        async function followWrapper(){
            await followUser(currentUser, targetUser);
            props.setIsFollowing(true);
        }

        async function getUpdatedUser() {
            const data = await getUserById(currentUser);
            props.setCurrentUser(data);
        }

        followWrapper();
        getUpdatedUser();
    }

    const handleUnfollow = async () => {
        
        async function unfollowWrapper(){
            const updatedUser = await unfollowUser(currentUser, targetUser);
            console.log(updatedUser);
            props.setIsFollowing(false);
        }

        async function getUpdatedUser() {
            const data = await getUserById(currentUser);
            props.setCurrentUser(data);
        }

        unfollowWrapper();
        getUpdatedUser();
    }

    if (isFollowing) {
        return (<button onClick={handleUnfollow} id="unfollowButton">Unfollow</button>);
    } else {
        return (<button onClick={handleFollow} id="followButton">Follow</button>);
    }
}
 
export default FollowButton;