import '../PostList.css';
import './ActivityFeed.css';
import React, { useEffect, useState, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroll-component';
import PostList from '../PostList';
import { getAllPosts } from '../../api/posts';
import { getUserById } from '../../api/users';

function ActivityFeed(props) {
  // should be passed in posts as props? I dont think so?
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { currentUsername } = props;
  const fetchCompleted = useRef(true);
  const isMounted = useRef(false);

  const fetchPosts = async () => {
    if (!hasMore || !fetchCompleted.current) return;
    fetchCompleted.current = false; // Indicate fetch started
    const newPosts = await getAllPosts(page);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setPage((prevPage) => prevPage + 1);
    setHasMore(newPosts.length > 0);
    fetchCompleted.current = true; // Indicate fetch completed
  };

  useEffect(() => {
    async function initialize() {
      const data = await getUserById(currentUsername);
      setCurrentUser(data);
      if (!isMounted.current && fetchCompleted.current) {
        isMounted.current = true;
        await fetchPosts();
      }
    }
    initialize();
  }, []);

  if (currentUser !== null) {
    return (
      <div className="feed" id="feedComponent">
        <h2>Activity Feed</h2>
        {currentUser && (
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={(
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            )}
            scrollThreshold="40px"
          >
            <PostList posts={posts} currentUser={currentUser} />
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default ActivityFeed;
