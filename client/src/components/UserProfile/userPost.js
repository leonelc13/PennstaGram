import './user.css';
import PostList from '../PostList';
import useFetch from '../useFetch';
import { useParams } from 'react-router-dom';
  

const UserPost = () => {
    const { user } = useParams();

    const handleClick = () => {
        // console.log('button clicked');
        // setPost('New User Post')
        // setUser('Alice')
    }

    // const handleDelete = (id) => {
    //     const newPosts = posts.filter(post => post.id !== id);
    //     setPosts(newPosts);
    // }

    const {data: posts, isLoading, error} = useFetch('http://localhost:8000/posts');
    
    return (  
        <div className = "userPost">
            {/* <h2> {user}'s {post} </h2>
            <button onClick={handleClick}> Add Post </button> */}
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            {/* {posts && <PostList posts = {posts} />} */}
            {posts && <PostList posts = {posts.filter((post) => post.user === user)}/>}
        </div>

    );
}
 
export default UserPost;