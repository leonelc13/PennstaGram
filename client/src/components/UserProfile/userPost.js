import './user.css';
import React from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../PostList';
// import { getPostsByUser } from '../../api/posts';

function UserPost(props) {
  const { username } = useParams();
  // const [posts, setPosts] = useState(null);
  const { allPosts } = props;
  const { currentUser } = props;

  // useEffect(() => {
  //   async function getPostWrapper() {
  //     const data = await getPostsByUser(username);
  //     setPosts(data);
  //     return data;
  //   }
  //   getPostWrapper();
  // }, [username]);
  const posts = allPosts.filter((post) => post.user === username);

  return (
    <div className="userPost">
      {posts && <PostList posts={posts} currentUser={currentUser} />}
    </div>

  );
}

export default UserPost;
