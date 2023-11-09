import React from 'react';
import { followUser, unfollowUser, getUserById } from '../../api/users';

function FollowButton(props) {
  const { currentUser } = props;
  const { targetUser } = props;
  const { isFollowing } = props;
  const { setIsFollowing } = props;
  const { setCurrentUser } = props;

  const handleFollow = async () => {
    async function followWrapper() {
      await followUser(currentUser, targetUser);
      setIsFollowing(true);
    }

    async function getUpdatedUser() {
      const data = await getUserById(currentUser);
      setCurrentUser(data);
    }

    followWrapper();
    getUpdatedUser();
  };

  const handleUnfollow = async () => {
    async function unfollowWrapper() {
      const updatedUser = await unfollowUser(currentUser, targetUser);
      // console.log(updatedUser);
      setIsFollowing(false);
      return updatedUser;
    }

    async function getUpdatedUser() {
      const data = await getUserById(currentUser);
      setCurrentUser(data);
    }

    unfollowWrapper();
    getUpdatedUser();
  };

  if (isFollowing) {
    return (<button type="button" onClick={handleUnfollow} id="unfollowButton">Unfollow</button>);
  }
  return (<button type="button" onClick={handleFollow} id="followButton">Follow</button>);
}

export default FollowButton;
