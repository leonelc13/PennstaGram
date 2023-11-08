import React from 'react';

//this is a pure component that displays a post item, but some state shoudl be lifed up to the parent component so that it can update
const PostView = (props) => {
    const post = props.post;

    return (  
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
            </div>
        </div>
    );
}
 
export default PostView;