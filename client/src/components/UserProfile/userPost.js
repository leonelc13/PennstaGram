import './user.css';
import PostList from '../PostList';
import useFetch from '../useFetch';
import { useParams } from 'react-router-dom';
import React from 'react';
  

const UserPost = () => {
    const { username } = useParams();

    const {data: posts, isLoading, error} = useFetch('http://localhost:3000/posts');
    
    return (  
        <div className = "userPost">
            {/* <h2> {user}'s {post} </h2>
            <button onClick={handleClick}> Add Post </button> */}
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            {/* {posts && <PostList posts = {posts} />} */}
            {posts && <PostList posts = {posts.filter((post) => post.user === username)}/>}
        </div>

    );
}
 
export default UserPost;