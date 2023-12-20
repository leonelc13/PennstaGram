import React from 'react';
import CommentList from './CommentList';
import AddComment from './AddComment';
import './Post.css';

function Comment(props) {
  const { currentUser } = props;
  const { comments } = props;
  const { updatePost } = props;

  return (
    <div data-testid="comment-list" className="comment">
      <h3> Comments </h3>
      {/* display the comments of the post here */}
      <CommentList comments={comments} currentUser={currentUser} />
      <AddComment currentUsername={currentUser} updatePost={updatePost} />
    </div>
  );
}

export default Comment;
