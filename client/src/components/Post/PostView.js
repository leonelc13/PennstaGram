import React from 'react';
import { updatePostLikesAndLikedBy } from '../../api/posts';
import './Post.css';

function PostView(props) {
  const { post, currentUsername, setPost } = props;

  const handleLikeOrUnlike = async () => {
    try {
      let updatedLikes = post.likes;
      let updatedLikedBy = [...post.likedBy];
      const userIndex = updatedLikedBy.indexOf(currentUsername);
      if (userIndex !== -1) {
        updatedLikes -= 1;
        updatedLikedBy = updatedLikedBy.filter((user) => user !== currentUsername);
      } else {
        updatedLikes += 1;
        updatedLikedBy = [...updatedLikedBy, currentUsername];
      }

      // eslint-disable-next-line no-underscore-dangle
      const updatedPostResponse = await updatePostLikesAndLikedBy(post._id, updatedLikes, updatedLikedBy);
      if (updatedPostResponse && updatedPostResponse.value) {
        setPost((prevPost) => ({
          ...prevPost,
          likes: updatedPostResponse.value.likes,
          likedBy: updatedPostResponse.value.likedBy,
        }));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
  };

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
      <button type="button" onClick={handleLikeOrUnlike}>
        {post.likedBy.includes(currentUsername) ? '♥' : '♡'}
        {post.likes}
        {' '}
        likes
      </button>
    </div>
  );
}

export default PostView;
