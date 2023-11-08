import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./PostDetails.css";
import PostView from './PostView';
import Comment from './Comment';
import EditPost from './EditPost';
import { useState, useEffect } from 'react';
import { getPostById, deletePost } from '../../api/posts';

//single post item should be passed in as props, so that we dont need to fetch it again
const PostDetails = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const currentUser = props.currentUsername;

    const [post, setPost] = useState(null); 

    async function updatePost(){
        const data = await getPostById(id);
        setPost(data);
    }

    useEffect(() => {
        updatePost();
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
                    <PostView post={post} />

                    <div className='deleteButton'>
                        {currentUser === post.user &&  <button onClick={handleDeletePost}> Delete Post </button>}
                    </div>            
                    {currentUser === post.user &&
                    <div className='editPostSection'>
                        <EditPost post={post} currentUser={currentUser} setPost={setPost}/>
                    </div>
                    }

                    <div className= "comments" id="comments">
                        <Comment comments={post.comments} currentUser={currentUser} updatePost = {updatePost} />
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default PostDetails;
