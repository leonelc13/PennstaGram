import React, { useState } from 'react';
import axios from "axios";
const { rootURL } = require('../../utils/utils');

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

      console.log('post submitted');

    } catch (err) {
        setErrorMessage(err.response.data.error);
        console.log('error', err.message);
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
          <p className="sign-text">Create Post</p>
          {errorMessage && <p className='error-text'>{errorMessage}</p>}
          <p>Post URL <input type="text" value={url} onChange={handleUrlChange} /></p>

          <p>Image or Video? <br />
            <label><input type="radio" name="isImage" value={true} required onChange={handleIsImageChange} defaultChecked={true}/> Image</label> <br />
            <label><input type="radio" name="isImage" value={false} required onChange={handleIsImageChange} /> Video</label>
          </p>
          <button type="submit" className="login-button">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
