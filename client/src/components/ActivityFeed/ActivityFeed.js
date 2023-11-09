import '../PostList.css';
import './ActivityFeed.css';
import React, { useEffect, useState } from 'react';
import PostList from '../PostList';
import { getAllPosts } from '../../api/posts';
import { getUserById } from '../../api/users';

function ActivityFeed(props) {
  // should be passed in posts as props? I dont think so?
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const { currentUsername } = props;

  useEffect(() => {
    async function getPostWrapper() {
      const data = await getAllPosts();
      setPosts(data);
      return data;
    }
    async function getCurrentUserWrapper() {
      const data = await getUserById(currentUsername);
      setCurrentUser(data);
      return data;
    }

    getPostWrapper();
    getCurrentUserWrapper();
  }, []);

  if (currentUser !== null) {
    return (
      <div className="feed" id="feedComponent">
        <h2> Activity Feed </h2>
        {posts && <PostList posts={posts} currentUser={currentUser} />}
      </div>

    );
  }
}

export default ActivityFeed;
