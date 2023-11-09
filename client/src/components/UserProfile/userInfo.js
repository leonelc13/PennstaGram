import React, { useState, useEffect } from 'react';
import './user.css';
import { Link } from 'react-router-dom';
import FollowButton from './Follow';
import { checkFolloing, getUserById } from '../../api/users';

function UserInfo(props) {
  const { currentUser } = props;
  const { targetUsername } = props;
  const { setCurrentUser } = props;

  const notUser = (currentUser?.username !== targetUsername);

  const [isFollowing, setIsFollowing] = useState(false);
  const [targetUser, setTargetUser] = useState(null);

  useEffect(() => {
    async function getFollowingWrapper() {
      const data = await checkFolloing(currentUser?.username, targetUsername);
      setIsFollowing(data);
      return data;
    }

    async function getTargetUserWrapper() {
      const data = await getUserById(targetUsername);
      setTargetUser(data);
      return data;
    }

    getTargetUserWrapper();
    getFollowingWrapper();
  }, [currentUser, isFollowing]);

  if (targetUser !== null) {
    return (
      <div className="profileData">
        <Link to={`/user/${targetUser}`}>
          {targetUser && <img className="profilePic" src={targetUser?.profile} alt="" />}
        </Link>
        <div className="profileText">
          <h2 className="username">{targetUser.username}</h2>
          <p> Bio </p>
          { targetUser.followers === null ? <p> Followers: 0 </p>
            : (
              <p>
                {' '}
                Followers:
                { Object.keys(targetUser.followers).length }
              </p>
            )}
          { targetUser.following === null ? <p> Following: 0 </p>
            : (
              <p>
                {' '}
                Following:
                { Object.keys(targetUser.following).length }
              </p>
            )}
          { notUser
            ? (
              // eslint-disable-next-line max-len
              <FollowButton currentUser={currentUser?.username} targetUser={targetUser.username} isFollowing={isFollowing} setIsFollowing={setIsFollowing} setCurrentUser={setCurrentUser} />
            )
            : <> </> }

        </div>
      </div>
    );
  }
}

export default UserInfo;
