/* eslint-disable no-underscore-dangle */
import './PostList.css';
import { Link } from 'react-router-dom';
import React from 'react';

function PostList(props) {
  const { currentUser } = props;
  const { posts } = props;

  // const filterPosts = () => {
  //     //checks if the post user is in the current user's following list
  //     //or if the post user is the current user
  //     const posts = allPosts?.filter((post) => {
  //         if(currentUser?.username === post.user){
  //             return true;
  //         }
  //         if(currentUser?.following){
  //             return currentUser?.following.includes(post.user);
  //         }
  //         return false;
  //     });
  //     return posts;
  // }

  // const posts = filterPosts();

  return (
    <div className="post-list">
      {posts?.map((post) => (
        <div className="post-preview" key={post._id.toString()} id="postPreview">
          <Link to={`/post/${post._id.toString()}`} currentUsername={currentUser?.username}>
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
