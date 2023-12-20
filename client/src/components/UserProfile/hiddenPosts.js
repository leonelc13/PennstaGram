import React, { useState, useEffect } from 'react';
import PostList from '../PostList';
import { getUserById } from '../../api/users';
import { getHiddenPostByUser, getAllPostIds } from '../../api/posts';

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
      const allPostIds = await getAllPostIds();

      // check if hidden post id is in all ids
      // console.log(hiddenPostsData);
      // eslint-disable-next-line no-underscore-dangle
      const filteredHiddenPosts = hiddenPostsData?.filter((hiddenPost) => allPostIds?.some((post) => post._id === hiddenPost._id));

      setHiddenPosts(filteredHiddenPosts);
      return data;
    }

    getCurrentUserWrapper();
  }, [currentUsername]);

  if (currentUser !== null && hiddenPosts !== null) {
    return (
      <div className="hiddenPosts" data-testid="post-list">
        <PostList posts={hiddenPosts} currentUser={currentUser} filter={filter} />
      </div>
    );
  }
}

export default HiddenPost;
