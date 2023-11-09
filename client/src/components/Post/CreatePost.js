import React, { useState } from 'react';
import { createPost, s3Upload } from '../../api/posts';

function CreatePost(props) {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isImage, setIsImage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [file, setFile] = useState(null);

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

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setErrorMessage('Missing media to post');
      return;
    }

    console.log(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const s3Url = await s3Upload(formData);
      console.log(s3Url);
      if (s3Url.error) {
        setErrorMessage(s3Url.error);
        return;
      }

      const postData = await createPost({
        title: postTitle,
        content: postContent,
        url: s3Url.message,
        isImage: isImage,
        user: props.username,
        likes: 0,
        comments: [],
        created: new Date().toISOString()
      });

      if (postData.error) {
        setErrorMessage(postData.error);
        return;
      }

      setErrorMessage('Post Submitted!');

    } catch (err) {
        const errorMessage = err.response?.data?.error ? err.response.data.error : err.message;
        console.log(errorMessage);
        setErrorMessage(errorMessage);
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
          <div>
            File:
            <input
              id="upld"
              type="file"
              name="someFiles"
              onChange={handleFileChange}
            />
          </div>

          <label htmlFor='isImageTrue'><input type="radio" name="isImage" id="isImageTrue" value={true} required onChange={handleIsImageChange} defaultChecked={true}/> Image</label> <br />
          <label htmlFor='isImageFalse'><input data-testid="isImageFalse" type="radio" name="isImage" id="isImageFalse" value={false} required onChange={handleIsImageChange} /> Video</label>
          <button type="submit" className="login-button">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
