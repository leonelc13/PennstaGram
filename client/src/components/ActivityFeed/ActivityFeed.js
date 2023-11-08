import '../PostList.css'
import './ActivityFeed.css'
import PostList from '../PostList';
import React from 'react';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../../api/posts';
import { getUserById } from '../../api/users';

const ActivityFeed = (props) => {

    //should be passed in posts as props? I dont think so? 
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState(null);

    
    useEffect(() => {
        async function getPostWrapper(){
            const data = await getAllPosts();
            setPosts(data);
            return data;
        }
        async function getCurrentUserWrapper(){
            const data = await getUserById(props.currentUsername);
            setCurrentUser(data);
            return data;
        }

        getPostWrapper();
        getCurrentUserWrapper();
    },[]);

    if (currentUser!== null){
    return (  
        <div className = "feed" id="feedComponent">
            <h2> Activity Feed </h2>
            {posts && <PostList posts = {posts} currentUser={currentUser}/>}
        </div>

    );}
}

 
export default ActivityFeed;
