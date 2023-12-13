import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, addCommentToPost } from '../../api/posts';
import './AddComment.css';

function AddComment(props) {
  const { id } = useParams();
  const { updatePost } = props;
  const { currentUsername } = props;
  const currentUser = currentUsername;

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function getPostWrapper() {
    const data = await getPostById(id);
    setPost(data);
  }

  useEffect(() => {
    getPostWrapper();
  }, [id]);

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  async function handleCommentSubmit(event) {
    event.preventDefault();
    if (comment === '') {
      setErrorMessage('Please fill out comment');
      return;
    }

    // let highestId = -1;
    // post.comments.forEach(() => {
    //   if (highestId < comment.id) {
    //     highestId = comment.id;
    //   }
    // });
    const commentLength = post.comments.length;

    const newComment = {
      id: commentLength + 1,
      content: comment,
      user: currentUser,
      created: new Date().toISOString(),
    };
    const response = await addCommentToPost(id, post.comments, newComment);
    // console.log('Added to Comments List', response);
    if (response === undefined || response === null) {
      // console.log('Add Comment response is empty');
      return;
    }
    if (response.status !== 200) {
      setErrorMessage(response.data.error);
    }
    updatePost();
  }

  return (
    <div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleCommentSubmit}>
        <label htmlFor="comment">
          Comment
          <textarea id="comment" type="text" value={comment} onChange={handleCommentChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddComment;
