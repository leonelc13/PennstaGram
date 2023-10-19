import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import Register from './components/RegisterPage/register';
import Login from './components/LoginPage/login';
import Header from './components/Header/header';
import Profile from './components/ProfilePage/profile';
import MainFeed from './components/Homepage/homepage';
import './style/index.css';
import axios from "axios";
import User from './components/UserProfile/user';
import Settings from './components/UserProfile/setting';
import PostDetails from './components/Post/PostDetails';
import ActivityFeed from './components/ActivityFeed/ActivityFeed'; 
const { rootURL } = require('./utils/utils');


function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState(-1);
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const [loading, setLoading] = useState(true); // Add this line


    useEffect(() => {
        if(token){
          axios.get(`${rootURL}:3000/users`, {
              params: { token: token }
          }).then(response => {
              if(response.data.length > 0) {
                  setUsername(response.data[0].username);
                  setUserId(response.data[0].id);
                  setAuthenticated(true);
              }
              setLoading(false);
          });
        } else {
            setLoading(false);
        }
    }, [token]);

    const handleLogout = () => {
        setAuthenticated(false);
        localStorage.removeItem('userToken');
        setToken(null);
    };

    const handleLogin = (response) => {
        console.log(response.username);
        setUsername(response.username);
        setAuthenticated(true);
        setToken(localStorage.getItem('userToken'));
    }

    let props = {
        user: username,
        handleLogout: handleLogout
    };

    if (loading) {
        return <div>Loading...</div>; // Or your preferred loading spinner or message
    }

    return (
        <Router>
            {authenticated ? (
                <>
                    <Header {...props} />
                    <Routes>
                        <Route exact path='/' element={<MainFeed userId={userId} />} />
                        <Route exact path='/profile/:username' element={<Profile {...props} />} />
                        <Route exact path='*' element={<Navigate to='/' />} />
                        <Route index element = {<ActivityFeed currentUser = {username}/>} /> 
                        <Route exact path ="/user/:username" element = {<User />} />
                        <Route path ="/user/settings" element = {<Settings />} />
                        <Route exact path ="/post/:id" element = {<PostDetails currentUser = {username}/>} />
                    </Routes>
                </>
            ) : (
                <>
                    <Routes>
                        <Route exact path='/login' element={<Login handleLogin={handleLogin} />} />
                        <Route exact path='/register' element={<Register handleLogin={handleLogin} />} />
                        <Route exact path='*' element={<Navigate to='/login' />} />
                        <Route index element = {<ActivityFeed />} /> 
                        <Route exact path ="/user/:username" element = {<User />} />
                        <Route path ="/user/settings" element = {<Settings />} />
                        <Route exact path ="/post/:id" element = {<PostDetails />} />
                    </Routes>
                </>
            )}
        </Router>
    );

//   return (
//     <Router>
//         <div className="App">
//             <div className = "content">
//                 <Routes>
//                     <Route index element = {<User />} />
//                     <Route path ="/user" element = {<User />} />
//                     <Route path ="/user/settings" element = {<Settings />} />
//                 </Routes>
//             </div>
//         </div>
//     </Router>
//   );

}

export default App;
