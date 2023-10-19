import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch';
import CommentList from '../Listing/CommentList';
import "./PostDetails.css"


const PostDetails = (props) => {
    const { id } = useParams();
    const {data: post, isLoading, error} = useFetch('http://localhost:3000/posts/' + id);
    const navigate = useNavigate();
    const currentUser = props.currentUser;
    console.log(currentUser);

    const handleDeletePost = () => {
        fetch('http://localhost:3000/posts/' + post.id, {
            method: 'DELETE'
        }).then(() => {
            navigate('/');
        })
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
                    <h2>{ post.content}</h2>
                    <p>posted by { post.user }</p>
                    {/* <div className='comments'>{post.comments}</div> */}
                    check if the current user is the poster if so then display the delete button
                    {currentUser === post.user &&  <button onClick = {handleDeletePost} > Delete Post </button>}
                    {/* <button onClick = {handleDelete} > Delete Post </button> */}
                </div>
            )}
        </div>
    );
}
 
export default PostDetails;