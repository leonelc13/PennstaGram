import React, { useState } from 'react';
import axios from "axios";
const { rootURL, serverPort } = require('../utils/utils');

function CreatePost(props) {
  const [url, setUrl] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isImage, setIsImage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  function handleUrlChange(event) {
    setUrl(event.target.value);
    console.log('Url changed', event.target.value);
    console.log(props.username);
  }

  function handleTitleChange(event) {
    setPostTitle(event.target.value);
    console.log('Title changed', event.target.value);
  }

  function handleContentChange(event) {
    setPostContent(event.target.value);
    console.log('Content changed', event.target.value);
  }

  function handleIsImageChange(event) {
    setIsImage(event.target.value === 'true'); // to maintain boolean value instead of string
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(isImage, url);
    console.log(typeof(isImage));

    if (!url) {
      setErrorMessage('Missing media to post');
      return;
    }

    try {
      const postResponse = await axios.post(`${rootURL}:${serverPort}/posts`, {
        title: postTitle,
        content: postContent,
        url: url,
        isImage: isImage,
        ownerId: props.username,
        likes: 0,
        comments: [],
        created: new Date().toISOString()
      });

      const postData = postResponse.data;

      if (postData.error) {
          setErrorMessage(postData.error);
          return;
      }

      setErrorMessage('Post Submitted!');

    } catch (err) {
        setErrorMessage(err.response.data.error);
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
          <p className="sign-text">Create Post</p>
          {errorMessage && <p className='error-text'>{errorMessage}</p>}
          <label htmlFor='postTitle'>Post Title</label>
          <input id="postTitle" type="text" value={postTitle} onChange={handleTitleChange} />
          <label htmlFor='postContent'>Post Content</label>
          <input id="postContent" type="text" value={postContent} onChange={handleContentChange} />

          <label htmlFor='postUrl'>Post URL</label>
          <input id="postUrl" type="text" value={url} onChange={handleUrlChange} />

          <label htmlFor='isImageTrue'><input type="radio" name="isImage" id="isImageTrue" value={true} required onChange={handleIsImageChange} defaultChecked={true}/> Image</label> <br />
          <label htmlFor='isImageFalse'><input data-testid="isImageFalse" type="radio" name="isImage" id="isImageFalse" value={false} required onChange={handleIsImageChange} /> Video</label>
          <button type="submit" className="login-button">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
