import React from "react";
import CommentList from "./CommentList";

const Comment = (props) => {
    const currentUser = props.currentUser;
    const comments = props.comments;

    return (  
        <div className="comment">
        <h3> Comments </h3>
        {/* display the comments of the post here */}
        <CommentList comments = {comments} currentUser = {currentUser}/>
        </div>

    );
}
 
export default Comment;