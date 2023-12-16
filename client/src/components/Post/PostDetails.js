import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetails.css';
import PostView from './PostView';
import Comment from './Comment';
import EditPost from './EditPost';
import HideButton from './HideButton';
import { getUserById } from '../../api/users';
import { getPostById, deletePost } from '../../api/posts';

// single post item should be passed in as props, so that we dont need to fetch it again
function PostDetails(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUsername } = props;
  const currentUser = currentUsername;

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  const updatePost = async () => {
    const data = await getPostById(id);
    setPost(data);
  };

  const getUser = async () => {
    const data = await getUserById(currentUsername);
    setUser(data);
  };

  useEffect(() => {
    const updateInterval = setInterval(() => {
      updatePost();
      getUser();
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(updateInterval);

    // The dependency array ensures that the effect runs only when id or currentUsername changes
  }, [id, currentUsername]);

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      navigate('/');
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="post-details">
      { post && user && (
        <div>
          <PostView post={post} currentUsername={currentUser} setPost={setPost} />
          {currentUser !== post.user
          && (
          <div className="hideButton">
            <HideButton currentUser={user} id={id} setUser={setUser} />
          </div>
          )}

          <div className="deleteButton">
            {currentUser === post.user && <button type="button" onClick={handleDeletePost}> Delete Post </button>}
          </div>
          {currentUser === post.user
                    && (
                    <div className="editPostSection">
                      <EditPost post={post} currentUser={currentUser} setPost={setPost} />
                    </div>
                    )}

          <div className="comments" id="comments">
            <Comment comments={post.comments} currentUser={currentUser} updatePost={updatePost} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
