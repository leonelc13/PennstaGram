import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../useFetch';


const PostDetails = () => {
    const { id } = useParams();
    const {data: post, isLoading, error} = useFetch('http://localhost:3000/posts/' + id);
    const navigate = useNavigate();

    const handleDelete = () => {
        fetch('http://localhost:8000/posts/' + post.id, {
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
                    <div className='image-video'> </div>
                    <h2>{ post.content}</h2>
                    <p>posted by { post.user }</p>
                    {/* <div>{ post.comments }</div> still need to see how to parse json object*/}
                    <button onClick = {handleDelete} > Delete Post </button>
                </div>
            )}
        </div>
    );
}
 
export default PostDetails;