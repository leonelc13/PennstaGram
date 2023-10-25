import React, { useState } from 'react';
import axios from "axios";
const { rootURL } = require('../utils/utils');

function CreatePost(props) {
  const [url, setUrl] = useState('');
  const [isImage, setIsImage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  function handleUrlChange(event) {
    setUrl(event.target.value);
    console.log('Url changed', event.target.value);
    console.log(props.userId);
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
      const postResponse = await axios.post(`${rootURL}:3000/posts`, {
        url: url,
        isImage: isImage,
        ownerId: props.userId
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
