import './PostList.css'
import { Link } from 'react-router-dom';
import React from 'react';

const PostList = (props) => {

    const posts  = props.posts;

    return ( 
        <div className="post-list">
            {posts?.map((post) => (
                <div className="post-preview" key={post.id} id="postPreview">
                    <Link to = {`/post/${post.id}`}>
                        {post.isImage ?
                            <img className="image-video" src={post.url} alt={post.testContent} />
                            : <iframe className="image-video" title={post.title} src={post.url}></iframe>}
                    </Link>
                    <div className="post-info">
                        <h1>Posted by 
                            <Link to={`/user/${post.user}`}> {post.user} </Link>
                        </h1>
                        <p>{post.content}</p>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default PostList;
