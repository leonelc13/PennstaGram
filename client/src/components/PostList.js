/* eslint-disable no-underscore-dangle */
import './PostList.css';
import { Link } from 'react-router-dom';
import React from 'react';

function PostList(props) {
  const { currentUser } = props;
  const { posts } = props;
  const { filter } = props;

  const filterPosts = () => {
    // checks if the post user is in the current user's following list
    // or if the post user is the current user
    if (!filter) {
      return posts;
    }

    const notHidden = posts?.filter((post) => {
      if (currentUser?.hiddenPosts) {
        return !currentUser?.hiddenPosts.includes(post._id.toString());
      }
      return true;
    });

    const result = notHidden?.filter((post) => {
      if (currentUser?.username === post.user) {
        return true;
      }
      if (currentUser?.following) {
        return currentUser?.following.includes(post.user);
      }
      return false;
    });
    return result;
  };

  const newPosts = filterPosts();

  const uniquePosts = Array.from(new Map(newPosts.map((post) => [post._id, post])).values());

  return (
    <div className="post-list">
      {uniquePosts?.map((post) => (
        <div className="post-preview" key={post._id.toString()} id="postPreview">
          <Link to={`/post/${post._id.toString()}`}>
            {post.isImage
              ? <img className="image-video" src={post.url} alt={post.testContent} />
              : <iframe className="image-video" title={post.title} src={post.url} />}
          </Link>
          <div className="post-info">
            <h1>
              Posted by
              <Link to={`/user/${post.user}`}>
                {' '}
                {post.user}
                {' '}
              </Link>
            </h1>
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
