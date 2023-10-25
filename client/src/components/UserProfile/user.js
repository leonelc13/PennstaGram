import React from 'react';
import './user.css';
import UserPost from './userPost'; 
import UserInfo from './userInfo';
import { Link, useParams } from 'react-router-dom';

const User= (props) => {
    const { username } = useParams();
    const currentUser = props.currentUser;

    return ( 
        <div className = "user">
            <div className="userHeader">
                <div className="links">
                    <Link to = {`/user/settings/${username}`}>Settings</Link>
                </div>
                <div className="userProfile" id="userProfileComponent">
                    <UserInfo currentUser = {currentUser} targetUser = {username} />
                </div>
            </div>
            <div className="userPost" id="userPostComponent">
                <UserPost />
            </div>
        </div>
    );
}

 
export default User;