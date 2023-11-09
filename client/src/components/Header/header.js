import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { getUserById } from '../../api/users';
/**
 * React Component for Header displayed to a logged in user
 * */

function Header(props) {
  const { currentUser } = props;
  const { handleLogout } = props;
  const [user, setUser] = useState(null);

  const logout = () => {
    handleLogout();
  };

  useEffect(() => {
    async function getCurrentUserWrapper() {
      const data = await getUserById(currentUser);
      setUser(data);
      return data;
    }
    getCurrentUserWrapper();
  }, [currentUser]);

  return (
    <div id="header-container">
      <span id="pennbuzz-name">
        <Link to="/">
          Penn
          <span id="buzz-name">
            Connect
          </span>
        </Link>
      </span>
      <input type="text" id="search-input" placeholder="Search for Users" />
      <span className="navbar-text">
        <Link to="/">
          Main Activity
        </Link>
      </span>
      <span className="navbar-text">
        <Link to="/chat">
          Chats
        </Link>
      </span>
      <span className="navbar-text">
        <Link to="/createpost">
          Create Post
        </Link>
      </span>
      <span id="user-profile-picture-wrapper">
        <Link to={`/user/${currentUser}`}>
          { user && <img src={user.profile} alt=" profile-pic" />}
        </Link>
      </span>

      <button type="button" onClick={logout} className="logout_button">Logout</button>

    </div>
  );
}
export default Header;
