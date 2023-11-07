import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import "./EditPost.css";
import { editPostById } from '../../api/posts';
import { useState } from 'react';

// in props there should be currentUser and post
// route post/:id/edit
const EditPost = (props) => {
    const setPost = props.setPost;

    const [newContent, setNewContent] = useState(props.post.content);

    const handleSubmit = async (event) => {
        const newPost = {
            content: newContent
        }
        try {
            event.preventDefault();
            const data = await editPostById(props.post._id, newPost);
            setPost(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        setNewContent(event.target.value);
    }

    return (  
        <div className = 'editPostDisplay'>
            <div className='editPostHeader'>Edit Post</div>
            <div className='editPostForm'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Content</label>
                        <div className='newInputs'>
                            <textarea name='content' value={newContent} onChange={handleChange}/>
                        </div>
                    </div>
                    <input type='submit' value='Submit Edit' className='editButton' />
                </form>
            </div>
        </div>
    );
}
 
export default EditPost;