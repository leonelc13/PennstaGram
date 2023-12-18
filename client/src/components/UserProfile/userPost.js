import './user.css';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PostList from '../PostList';
// import { getPostsByUser } from '../../api/posts';

function UserPost(props) {
  const { username } = useParams();
  // const [posts, setPosts] = useState(null);
  const { allPosts } = props;
  const { currentUser } = props;
  const filter = false;

  // const posts = allPosts.filter((post) => post.user === username);

  return (
    <div>
      <div className="userPost">
        {allPosts && <PostList posts={allPosts} currentUser={currentUser} filter={filter} />}
      </div>
      <div className="hiddenPosts">
        <Link to={`/user/${username}/hidden`}>Hidden Posts</Link>
      </div>
    </div>
  );
}

export default UserPost;
