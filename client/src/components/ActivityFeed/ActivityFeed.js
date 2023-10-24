import '../PostList.css'
import './ActivityFeed.css'
import PostList from '../PostList';
import React from 'react';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../../api/posts';

const ActivityFeed = (props) => {

    const currentUser = props.currentUser;
    
    const [posts, setPosts] = useState(null);
    
    useEffect(() => {
        async function getPostWrapper(){
            const data = await getAllPosts();
            setPosts(data);
            return data;
        }
        getPostWrapper();
    },[]);

    return (  
        <div className = "feed">
            <h2> Activity Feed </h2>
            {posts && <PostList posts = {posts} currentUser = {currentUser}/>}
        </div>

    );
}

 
export default ActivityFeed;
