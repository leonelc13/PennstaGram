import React, { useState, useEffect } from 'react';
import PostList from '../PostList';
import { getUserById } from '../../api/users';
import { getHiddenPostByUser } from '../../api/posts';

function HiddenPost(props) {
  const { currentUsername } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [hiddenPosts, setHiddenPosts] = useState(null);

  const filter = false;

  useEffect(() => {
    async function getCurrentUserWrapper() {
      const data = await getUserById(currentUsername);
      setCurrentUser(data);

      const hiddenPostsData = await getHiddenPostByUser(currentUsername);
      setHiddenPosts(hiddenPostsData);
      return data;
    }

    getCurrentUserWrapper();
  }, [currentUsername]);

  if (currentUser !== null && hiddenPosts !== null) {
    return (
      <div className="hiddenPosts">
        <PostList posts={hiddenPosts} currentUser={currentUser} filter={filter} />
      </div>
    );
  }
}

export default HiddenPost;
