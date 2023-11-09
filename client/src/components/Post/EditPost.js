import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import "./EditPost.css";
import { editPostById, s3Upload } from '../../api/posts';
import { useState } from 'react';

// in props there should be currentUser and post
// route post/:id/edit
const EditPost = (props) => {
    const setPost = props.setPost;

    const [file, setFile] = useState(null);
    const [isImage, setIsImage] = useState(true);
    const [newContent, setNewContent] = useState(props.post.content);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        let s3Url;
        let newPost = {};
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                s3Url = await s3Upload(formData);
                console.log(s3Url.message);
                if (s3Url.error) {
                    setErrorMessage(s3Url.error);
                    return;
                }
            } catch (err) {
                const errorMessage = err.response?.data?.error ? err.response.data.error : err.message;
                console.log(errorMessage);
                setErrorMessage(errorMessage);    
            }
            newPost.url = s3Url.message;
            newPost.isImage = isImage;
        }
    
        if (newContent) {
            newPost.content = newContent;
        }

        try {
            const data = await editPostById(props.post._id, newPost);
            setPost(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        setNewContent(event.target.value);
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    const handleIsImageChange = (event) => {
        setIsImage(event.target.value === 'true'); // to maintain boolean value instead of string
    }
    
    return (  
        <div className = 'editPostDisplay'>
            <div className='editPostHeader'>Edit Post</div>
            {errorMessage && <p>{errorMessage}</p>}
            <div className='editPostForm'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Content</label>
                        <div className='newInputs'>
                            <textarea name='content' value={newContent} onChange={handleChange}/>
                        </div>
                    </div>
                    <div>
                        (optional) Update post file:
                        <input
                            id="upld"
                            type="file"
                            name="someFiles"
                            onChange={handleFileChange}
                        />
                    </div>
                    <label htmlFor='isImageTrue'><input type="radio" name="isImage" id="isImageTrue" value={true} required onChange={handleIsImageChange} defaultChecked={true}/> Image</label> <br />
                    <label htmlFor='isImageFalse'><input data-testid="isImageFalse" type="radio" name="isImage" id="isImageFalse" value={false} required onChange={handleIsImageChange} /> Video</label> <br />
                    <input type='submit' value='Submit Edit' className='editButton' />
                </form>
            </div>
        </div>
    );
}
 
export default EditPost;
