import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetails.css';
import PostView from './PostView';
import Comment from './Comment';
import EditPost from './EditPost';
import { getPostById, deletePost } from '../../api/posts';

// single post item should be passed in as props, so that we dont need to fetch it again
function PostDetails(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUsername } = props;
  const currentUser = currentUsername;

  const [post, setPost] = useState(null);

  const updatePost = async () => {
    const data = await getPostById(id);
    setPost(data);
  };

  useEffect(() => {
    updatePost();
  }, [id]);

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
      { post && (
        <div>
          <PostView post={post} currentUsername={currentUser} setPost={setPost} />

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
