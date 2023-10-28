import './user.css';
import React from 'react';
import PostList from '../PostList';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPostsByUser } from '../../api/posts';

const UserPost = (props) => {
    const { username } = useParams();
    const [posts, setPosts] = useState(null);
    const currentUser = props.currentUser;

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
            {posts && <PostList posts = {posts} userList = {[currentUser?.username]}/>}
        </div>

    );
}
 
export default UserPost;