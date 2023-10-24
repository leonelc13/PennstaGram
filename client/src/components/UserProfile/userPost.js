import './user.css';
import React from 'react';
import PostList from '../PostList';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPostsByUser } from '../../api/posts';

const UserPost = () => {
    const { username } = useParams();
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function getPostWrapper(){
            const data = await getPostsByUser(username);
            setPosts(data);
            return data;
        }
        getPostWrapper();
    },[username]);
    
    return (  
        <div className = "userPost">
            {posts && <PostList posts = {posts}/>}
        </div>

    );
}
 
export default UserPost;