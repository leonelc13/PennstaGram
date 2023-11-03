import './CommentList.css'
import { Link } from 'react-router-dom';
import React from 'react';

const CommentList = (props) => {

    const comments  = props.comments;
    const currentUser = props.currentUser;

    return(
        <div className="comments-list">
            {comments?.map((comment) => (
                <div className="comment-preview" key = {comment.id}>
                        <p>
                            <Link to={`/user/${comment.user}`}> {comment.user} </Link>
                            said:
                        </p>
                        <p>{comment.content}</p>
                        {/* check if the current user is the poster if so then display the delete button */}
                        {currentUser === comment.user &&  <button> Delete Comment </button>}
                </div>
            ))}
        </div>

    )
}
 
export default CommentList;
