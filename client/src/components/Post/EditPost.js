import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';
import { editPostById, s3Upload } from '../../api/posts';

function EditPost(props) {
  const { setPost } = props;
  const { post } = props;

  const [file, setFile] = useState(null);
  const [isImage, setIsImage] = useState(true);
  const [newContent, setNewContent] = useState(post.content);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    let s3Url;
    const newPost = {};
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        s3Url = await s3Upload(formData);
        // console.log(s3Url.message);
        if (s3Url.error) {
          setErrorMessage(s3Url.error);
          return;
        }
      } catch (err) {
        const newErrorMessage = err.response?.data?.error ? err.response.data.error : err.message;
        // console.log(errorMessage);
        setErrorMessage(newErrorMessage);
      }
      newPost.url = s3Url.message;
      newPost.isImage = isImage;
    }

    if (newContent) {
      newPost.content = newContent;
    }

    try {
      // eslint-disable-next-line no-underscore-dangle
      const data = await editPostById(post._id, newPost);
      setPost(data);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleChange = (event) => {
    setNewContent(event.target.value);
  };

  const handleFileChange = (event) => {
    setErrorMessage('');
    if (event.target.files[0].type.startsWith('image/')) {
      if (event.target.files[0].size > 52428800) {
        setErrorMessage('Image file size limit is 50MB');
        setFile(null);
        return;
      }
    } else if (event.target.files[0].type.startsWith('video/')) {
      if (event.target.files[0].size > 524288000) {
        setErrorMessage('Video file size limit is 500MB');
        setFile(null);
        return;
      }
    } else {
      setErrorMessage('Only image and video files are allowed!');
      setFile(null);
      return;
    }
    setFile(event.target.files[0]);
  };
  const handleIsImageChange = (event) => {
    setIsImage(event.target.value === 'true'); // to maintain boolean value instead of string
  };

  return (
    <div className="editPostDisplay">
      <div className="editPostHeader">Edit Post</div>
      {errorMessage && <p id="error-msg">{errorMessage}</p>}
      <div className="editPostForm">
        <form data-testid="edit-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="1">
              Content
              <div className="newInputs">
                <textarea id="1" name="content" value={newContent} onChange={handleChange} />
              </div>
            </label>
          </div>
          <div>
            (optional) Update post file:
            <input
              id="upld"
              type="file"
              name="someFiles"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </div>
          <label htmlFor="isImageTrue">
            <input type="radio" name="isImage" id="isImageTrue" value required onChange={handleIsImageChange} defaultChecked />
            {' '}
            Image
          </label>
          {' '}
          <br />
          <label htmlFor="isImageFalse">
            <input data-testid="isImageFalse" type="radio" name="isImage" id="isImageFalse" value={false} required onChange={handleIsImageChange} />
            {' '}
            Video
          </label>
          {' '}
          <br />
          <input type="submit" value="Submit Edit" className="editButton" />
        </form>
      </div>
    </div>
  );
}

export default EditPost;
