import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from './CommentList';
import "./PostDetails.css";
import { useState, useEffect } from 'react';
import { getPostById, deletePost } from '../../api/posts';

const PostDetails = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUser = props.currentUser;

    const [post, setPost] = useState(null);

    useEffect(() => {
        async function getPostWrapper(){
            const data = await getPostById(id);
            setPost(data);
            return data;
        }
        getPostWrapper();
    },[id]);
    
    const handleDeletePost = async () => {
        try {
            await deletePost(id);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="post-details">
            { post && (
                <div>
                    <div className="post-display">
                        {post.isImage ?
                                <img className="image-video" src={ post.url } alt={ post.testContent } />
                                : <iframe className="image-video" title={ post.title } src={ post.url }></iframe>}
                    </div>
                    <div className="post-content">
                        <h2>{ post.content}</h2>
                        <p>posted by { post.user }</p>
                        {currentUser === post.user &&  <button onClick = { handleDeletePost } > Delete Post </button>}
                    </div>
                    <div className= "comments">
                        <h3> Comments </h3>
                        {/* display the comments of the post here */}
                        <CommentList comments = {post.comments} currentUser = {currentUser}/>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default PostDetails;