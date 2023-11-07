import React from 'react';
import './user.css';
import FollowButton from './Follow';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserById, checkFolloing } from '../../api/users';

const UserInfo = (props) => {
    const currentUser = props.currentUser;
    const targetUser = props.targetUser;
    const setCurrentUser = props.setCurrentUser;

    const notUser = (currentUser?.username !== targetUser);

    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);

    useEffect(() => {
        console.log("in UserInfo, current user is: ", currentUser);
        console.log("in UserInfo, target user is: ", targetUser);

        async function getTargetUserWrapper(){
            const data = await getUserById(targetUser);
            setUser(data);
            setFollowers(data.followers);
            setFollowing(data.following);
            return data;
        }

        async function getFollowingWrapper(){
            const data = await checkFolloing(currentUser?.username, targetUser);
            setIsFollowing(data);
            return data;
        }
        
        getTargetUserWrapper();
        getFollowingWrapper();

    },[currentUser, targetUser, isFollowing]);


    return ( 
    <div className= "profileData">
        <Link to = {`/user/${targetUser}`}>
            {user && <img className='profilePic' src={user?.profile} alt=""/>}
        </Link>
        <div className="profileText">
            <h2 className="username">{targetUser}</h2>
            <p> Bio </p>
            { followers === null ? <p> Followers: 0 </p> :
                <p> Followers: { Object.keys(followers).length } </p>
            }
            {  following === null? <p> Following: 0 </p> :
                <p> Following: { Object.keys(following).length } </p>
            }
            { notUser?
            <> 
            {/* {console.log("isFollowing: " + isFollowing)} */}
            {/* {console.log("in UserInfo currentUser username: " + currentUser?.username)} */}
            <FollowButton currentUser = {currentUser?.username} targetUser = {targetUser} isFollowing = {isFollowing} setIsFollowing = {setIsFollowing} setCurrentUser = {setCurrentUser}/>
            </>
            : <> </> }


        </div>
    </div> );
}
 
export default UserInfo;