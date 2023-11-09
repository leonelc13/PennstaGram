import React from 'react';

function PostView(props) {
  const { post } = props;

  return (
    <div>
      <div className="post-display">
        <h1>{post.title}</h1>
        {post.isImage
          ? <img className="image-video" src={post.url} alt={post.testContent} />
          : <iframe className="image-video" title={post.title} src={post.url} />}
      </div>
      <div className="post-content">
        <h2>{ post.content}</h2>
        <p>
          posted by
          { post.user }
        </p>
      </div>
    </div>
  );
}

export default PostView;
