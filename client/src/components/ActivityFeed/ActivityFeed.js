import '../PostList.css'
import './ActivityFeed.css'
import PostList from '../PostList';
import useFetch from '../useFetch';

const ActivityFeed = () => {
      
    // const handleDelete = (id) => {
    //     const newPosts = posts.filter(post => post.id !== id);
    //     setPosts(newPosts);
    // }

    const {data: posts, isLoading, error} = useFetch('http://localhost:3000/posts');
    
    return (  
        <div className = "feed">
            <h1> Activity Feed: currently showing all posts </h1>
            {/* <h2> {user}'s {post} </h2>
            <button onClick={handleClick}> Add Post </button> */}
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            {posts && <PostList posts = {posts} />}
        </div>

    );
}

 
export default ActivityFeed;
