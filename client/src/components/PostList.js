import './PostList.css'
import { Link } from 'react-router-dom';

const PostList = (props) => {

    const posts  = props.posts;

    return ( 
        <div className="post-list">
            {posts.map((post) => (
                <div className="post-preview" key={post.id}>
                    <Link to = {`/post/${post.id}`}>
                        <div className='image-video'> </div>
                    </Link>
                    <div className="post-info">
                        <h1>Posed by 
                            <Link to={`/user/${post.user}`}> {post.user} </Link>
                        </h1>
                        <p>{post.content}</p>
                        {/* <button onClick = { () => handleDelete(post.id)}> Delete Post </button> */}
                        <button > Delete Post </button>
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default PostList;