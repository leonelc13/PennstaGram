import React, { useState, useEffect } from 'react';
import './user.css';
import { Link, useParams } from 'react-router-dom';
import UserPost from './userPost';
import UserInfo from './userInfo';
import { getUserById } from '../../api/users';

function User(props) {
  const { username } = useParams();

  // get current user object
  const { currentUsername } = props;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getCurrentUserWrapper() {
      const data = await getUserById(currentUsername);
      setCurrentUser(data);
      return data;
    }

    getCurrentUserWrapper();
  }, [username]);

  if (currentUser !== null) {
    return (
      <div className="user">
        {/* {console.log(`target user: ${username}`)}
        {console.log(`current user: ${currentUser}`)} */}
        <div className="userHeader">
          <div className="links">
            <Link to={`/user/settings/${username}`}>Settings</Link>
          </div>
          <div className="userProfile" id="userProfileComponent">
            <UserInfo currentUser={currentUser} targetUsername={username} setCurrentUser={setCurrentUser} />
          </div>
        </div>
        <div className="userPost" id="userPostComponent">
          <UserPost currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </div>
      </div>
    );
  }
}

export default User;
