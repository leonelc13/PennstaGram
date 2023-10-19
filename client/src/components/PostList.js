import './PostList.css'
import { Link } from 'react-router-dom';

const PostList = (props) => {

    const posts  = props.posts;
    // const currentUser = props.currentUser;

    return ( 
        <div className="post-list">
            {posts.map((post) => (
                <div className="post-preview" key={post.id}>
                    <Link to = {`/post/${post.id}`}>
                        {post.isImage ?
                            <img className="image-video" src={post.url} alt={post.testContent} />
                            : <iframe className="image-video" title={post.title} src={post.url}></iframe>}
                    </Link>
                    <div className="post-info">
                        <h1>Posted by 
                            <Link to={`/user/${post.user}`}> {post.user} </Link>
                        </h1>
                        <p>{post.content}</p>
                        {/* <button onClick = { () => handleDelete(post.id)}> Delete Post </button> */}
                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default PostList;
