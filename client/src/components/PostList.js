import './PostList.css'

const PostList = (props) => {

    const posts  = props.posts;
    const handleDelete = props.handleDelete;


    return ( 
        <div className="post-list">
            {posts.map((post) => (
                <div className="post-preview" key={post.id}>
                    <h1>Posed by 
                        <a href={`/home/${post.username}`}> {post.author} </a>
                    </h1>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    {/* <button onClick = { () => handleDelete(post.id)}> Delete Post </button> */}
                    <button > Delete Post </button>
                </div>
            ))}
        </div>
     );
}
 
export default PostList;