import React, { useState } from 'react';

function CreatePost(props) {
  const [url, setUrl] = useState('');
  const [isImage, setIsImage] = useState(true);

  function handleUrlChange(event) {
    setUrl(event.target.value);
    console.log('Url changed', event.target.value)
  }

  function handleIsImageChange(event) {
    setIsImage(event.target.value === 'true'); // to maintain boolean value instead of string
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(isImage, url);
    console.log(typeof(isImage));
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
          <p className="sign-text">Create Post</p>
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
