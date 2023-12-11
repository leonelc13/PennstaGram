import React, { useState, useEffect } from 'react';
import './user.css';
import { useParams } from 'react-router-dom';
import UserPost from './userPost';
import UserInfo from './userInfo';
import { getUserById } from '../../api/users';
import { getPostsByUser } from '../../api/posts';

function User(props) {
  const { username } = useParams();

  // get current user object
  const { currentUsername } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    async function getCurrentUserWrapper() {
      const data = await getUserById(currentUsername);
      setCurrentUser(data);
      return data;
    }

    async function getUserPostsWrapper() {
      const data = await getPostsByUser(username);
      setUserPosts(data);
      return data;
    }

    getUserPostsWrapper();
    getCurrentUserWrapper();
  }, [username]);

  if (currentUser !== null && userPosts !== null) {
    return (
      <div className="user">
        {/* {console.log(`target user: ${username}`)}
        {console.log(`hidden: ${hiddenPosts}`)} */}
        <div className="userHeader">
          <div className="userProfile" id="userProfileComponent">
            <UserInfo currentUser={currentUser} targetUsername={username} setCurrentUser={setCurrentUser} />
          </div>
        </div>
        <div className="userPost" id="userPostComponent">
          <h2 className="userPostsHeader">Posts:</h2>
          <UserPost currentUser={currentUser} setCurrentUser={setCurrentUser} allPosts={userPosts} />
        </div>
      </div>
    );
  }
}

export default User;
