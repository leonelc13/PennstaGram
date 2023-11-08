import React from 'react';
import './user.css';
import UserPost from './userPost'; 
import UserInfo from './userInfo';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserById } from '../../api/users';

const User= (props) => {
    const { username } = useParams();

    //get current user object
    const currentUsername = props.currentUsername;
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        console.log("useeffect called");
        async function getCurrentUserWrapper(){
            const data = await getUserById(currentUsername);
            setCurrentUser(data);
            return data;
        }

        getCurrentUserWrapper();

    },[username])

    if (currentUser !== null ) {
        return ( 
            <div className = "user">
                {console.log("target user: " +  username)}
                {console.log("current user: " + currentUser)}
                <div className="userHeader">
                    <div className="links">
                        <Link to = {`/user/settings/${username}`}>Settings</Link>
                    </div>
                    <div className="userProfile" id="userProfileComponent">
                        <UserInfo currentUser = {currentUser} targetUsername = {username} setCurrentUser = {setCurrentUser} />
                    </div>
                </div>
                <div className="userPost" id="userPostComponent">
                    <UserPost currentUser={currentUser} setCurrentUser = {setCurrentUser}/>
                </div>
            </div>
    );}
}

 
export default User;