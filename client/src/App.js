import React, { useState, useRef } from 'react';
import {
  Route, BrowserRouter as Router, Routes, Navigate,
} from 'react-router-dom';
import Register from './components/RegisterPage/register';
import Login from './components/LoginPage/login';
import Header from './components/Header/header';
import CreatePost from './components/Post/CreatePost';
import './style/index.css';
import User from './components/UserProfile/user';
import PostDetails from './components/Post/PostDetails';
import ActivityFeed from './components/ActivityFeed/ActivityFeed';

function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('app-token') !== null);
  const username = useRef(null);
  const userpic = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('app-token');
    localStorage.removeItem('user-profile-picture');
    localStorage.removeItem('user');
    setAuthenticated(false);
    window.location.reload(true);
  };

  /** const handleLogin = (response) => {
        console.log(response.username);
        setUsername(response.username);
        setAuthenticated(true);
        setToken(localStorage.getItem('userToken'));
    } */

  const handleLogin = (response) => {
    const { apptoken, username: usernameValue, profilePicture } = response.data;
    username.current = usernameValue;
    userpic.current = profilePicture;
    if (apptoken) {
      localStorage.setItem('user-profile-picture', profilePicture);
      localStorage.setItem('user', usernameValue);
      localStorage.setItem('app-token', apptoken);
      setAuthenticated(true);
    }
  };

  // const props = {
  //   user_profile_picture: localStorage.getItem('user-profile-picture'),
  //   user: localStorage.getItem('user'),
  //   handleLogout,
  // };

  const pic = localStorage.getItem('user-profile-picture');
  const user = localStorage.getItem('user');

  // if (authenticated) console.log("META PROPS ", props);

  return (
    <Router>
      {authenticated ? (
        <>
          <Header user_profile_picture={pic} currentUser={user} handleLogout={handleLogout} />
          <Routes>
            <Route exact path="/" element={<ActivityFeed currentUsername={user} />} />
            <Route exact path="*" element={<Navigate to="/" />} />
            <Route index element={<ActivityFeed currentUsername={user} />} />
            <Route exact path="/user/:username" element={<User currentUsername={user} />} />
            <Route exact path="/post/:id" element={<PostDetails currentUsername={user} />} />
            <Route exact path="/createpost" element={<CreatePost username={user} />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
