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
    // Fetch user information and posts initially
    const fetchData = async () => {
      try {
        const user = await getUserById(currentUsername);
        setCurrentUser(user);

        const posts = await getPostsByUser(username);
        setUserPosts(posts);
      } catch (error) {
        // Handle errors
        // console.error(error);
      }
    };

    fetchData();

    // Set up an interval to periodically fetch data
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [currentUsername, username]);

  if (currentUser !== null && userPosts !== null) {
    return (
      <div className="user">
        {/* {console.log(`target user: ${username}`)}
        {console.log(`hidden: ${userPosts}`)} */}
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
