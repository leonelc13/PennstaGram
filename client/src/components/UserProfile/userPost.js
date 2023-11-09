import './user.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../PostList';
import { getPostsByUser } from '../../api/posts';

function UserPost(props) {
  const { username } = useParams();
  const [posts, setPosts] = useState(null);
  const { currentUser } = props;

  useEffect(() => {
    async function getPostWrapper() {
      const data = await getPostsByUser(username);
      setPosts(data);
      return data;
    }
    getPostWrapper();
  }, [username]);

  return (
    <div className="userPost">
      {posts && <PostList posts={posts} userList={[currentUser?.username]} />}
    </div>

  );
}

export default UserPost;
