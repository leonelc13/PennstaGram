import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch';
import CommentList from '../Listing/CommentList';
import "./PostDetails.css"
import axios from 'axios';

const PostDetails = (props) => {
    const { id } = useParams();
    const {data: post, isLoading, error} = useFetch('http://localhost:3000/posts/' + id);
    const {data: post, isLoading, error} = useFetch('http://localhost:3000/posts/' + id);
    const navigate = useNavigate();
    const currentUser = props.currentUser;

    // const handleDeletePost = () => {
    //     fetch('http://localhost:3000/posts/' + post.id, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         navigate('/');
    //     })
    // }
    
    // use axios to detete post and then navigate to the home page
    const handleDeletePost = async () => {
        try {
            await axios.delete(`http://localhost:3000/posts/${id}`);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="post-details">
            <h2>Post Details - { id }</h2>
            { isLoading && <div>Loading...</div> }
            { error && <div>{ error }</div>}
            { post && (
                <div>
                    {/* display the image of the post here */}
                    <div className="post-display">
                        {post.isImage ?
                                <img className="image-video" src={post.url} alt={post.testContent} />
                                : <iframe className="image-video" title={post.title} src={post.url}></iframe>}
                    </div>
                    <div className="post-content">
                        <h2>{ post.content}</h2>
                        <p>posted by { post.user }</p>
                        {currentUser === post.user &&  <button onClick = {handleDeletePost} > Delete Post </button>}
                    </div>
                    <div className= "comments">
                        <h3> Comments </h3>
                        {/* display the comments of the post here */}
                        <CommentList comments = {post.comments} currentUser = {currentUser}/>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default PostDetails;