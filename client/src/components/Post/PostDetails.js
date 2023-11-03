import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from './CommentList';
import "./PostDetails.css";
import { useState, useEffect } from 'react';
import { getPostById, deletePost, addCommentToPost } from '../../api/posts';

const PostDetails = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUser = props.currentUser;

    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    async function getPostWrapper(){
        const data = await getPostById(id);
        setPost(data);
        return data;
    }

    useEffect(() => {    
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

    function handleCommentChange(event) {
        setComment(event.target.value);
        console.log('Comment changed', event.target.value);
    }
    
    async function handleCommentSubmit(event) {
        event.preventDefault();
        if(comment === '') {
            setErrorMessage('Please fill out comment');
            return;
        }

        let highestId = -1;
        post.comments.forEach(comment => {
            if (highestId < comment.id) {
                highestId = comment.id;
            }
        });

        const newComment = {
            id: highestId + 1,
            content: comment,
            user: currentUser.user,
            created: new Date().toISOString()
        }
        const response = await addCommentToPost(id, post.comments, newComment);
        console.log('Added to Comments List', response);
        if (response.status !== 200) {
            setErrorMessage(response.data.error);
        }
        getPostWrapper();
    }

    return (
        <div className="post-details">
            { post && (
                <div>
                    <div className="post-display">
                        <h1>{post.title}</h1>
                        {post.isImage ?
                                <img className="image-video" src={ post.url } alt={ post.testContent } />
                                : <iframe className="image-video" title={ post.title } src={ post.url }></iframe>}
                    </div>
                    <div className="post-content">
                        <h2>{ post.content}</h2>
                        <p>posted by { post.user }</p>
                        {currentUser === post.user &&  <button onClick = { handleDeletePost } > Delete Post </button>}
                    </div>
                    <div className= "comments" id="comments">
                        <h3> Comments </h3>
                        {/* display the comments of the post here */}
                        <CommentList comments = {post.comments} currentUser = {currentUser}/>
                        {errorMessage && <p className='error-message'>{errorMessage}</p>}
                        <form onSubmit={handleCommentSubmit}>
                            <label htmlFor='comment'>Comment</label>
                            <input id="comment" type="text" value={comment} onChange={handleCommentChange} />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default PostDetails;
