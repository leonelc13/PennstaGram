import React from 'react';
import { useState, useEffect } from 'react';
import { getPostById, addCommentToPost } from '../../api/posts';
import { useParams } from 'react-router-dom';

const AddComment = (props) => {
  const { id } = useParams();

  const currentUser = props.currentUsername;

  const [post, setPost] = useState(null); 
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function getPostWrapper(){
      const data = await getPostById(id);
      setPost(data);
  }

  useEffect(() => {
    getPostWrapper();
  },[id]);

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
        user: currentUser,
        created: new Date().toISOString()
    }
    const response = await addCommentToPost(id, post.comments, newComment);
    console.log('Added to Comments List', response);
    if (response === undefined || response === null) {
      console.log('Add Comment response is empty');
      return;
    }
    if (response.status !== 200) {
        setErrorMessage(response.data.error);
    }
    props.updatePost();
  }

  return (
    <div>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <form onSubmit={handleCommentSubmit}>
          <label htmlFor='comment'>Comment</label>
          <input id="comment" type="text" value={comment} onChange={handleCommentChange} />
          <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddComment;
