import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import Register from './components/RegisterPage/register';
import Login from './components/LoginPage/login';
import Header from './components/Header/header';
import CreatePost from './api/createpost'; 
import './style/index.css';
// import axios from "axios";
import User from './components/UserProfile/user';
import Settings from './components/UserProfile/setting';
import PostDetails from './components/Post/PostDetails';
import ActivityFeed from './components/ActivityFeed/ActivityFeed'; 
import { getUserByToken } from './api/users';
// const { rootURL } = require('./utils/utils');


function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    // const [userId, setUserId] = useState(-1);
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const [loading, setLoading] = useState(true); 
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loginWrapper(){
            const data = await getUserByToken(token, setUser, setAuthenticated, setLoading);
            return data;
        }
        loginWrapper();
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
        user: user,
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
                        <Route exact path='/' element={<ActivityFeed />} />
                        <Route exact path='*' element={<Navigate to='/' />} />
                        <Route index element = {<ActivityFeed currentUser = {user}/>} /> 
                        <Route exact path ="/user/:username" element = {<User currentUser = {user}/>} />
                        <Route path ="/user/settings/:username" element = {<Settings currentUser = {username}/>} />
                        <Route exact path ="/post/:id" element = {<PostDetails currentUser = {username}/>} />
                        <Route exact path ="/createpost" element = {<CreatePost userId={username} />} />
                    </Routes>
                </>
            ) : (
                <>
                    <Routes>
                        <Route exact path='/login' element={<Login handleLogin={handleLogin} />} />
                        <Route exact path='/register' element={<Register handleLogin={handleLogin} />} />
                        <Route exact path='*' element={<Navigate to='/login' />} />
                    </Routes>
                </>
            )}
        </Router>
    );
}

export default App;
