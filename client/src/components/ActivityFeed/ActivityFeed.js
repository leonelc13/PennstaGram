import '../PostList.css'
import './ActivityFeed.css'
import PostList from '../PostList';
import useFetch from '../useFetch';

const ActivityFeed = (props) => {
      
    // const handleDelete = (id) => {
    //     const newPosts = posts.filter(post => post.id !== id);
    //     setPosts(newPosts);
    // }
    const currentUser = props.currentUser;

    const {data: posts, isLoading, error} = useFetch('http://localhost:3000/posts');
    
    return (  
        <div className = "feed">
            <h2> Activity Feed </h2>
            { error && <div>{ error }</div>}
            { isLoading && <div>Loading...</div>}
            {posts && <PostList posts = {posts} currentUser = {currentUser}/>}
        </div>

    );
}

 
export default ActivityFeed;
