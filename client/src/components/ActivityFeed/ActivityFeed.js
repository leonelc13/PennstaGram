import '../PostList.css';
import './ActivityFeed.css';
import React, { useEffect, useState, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroll-component';
import PostList from '../PostList';
// delete get ALL posts
import { getFeed } from '../../api/posts';
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

  const filter = true;

  const fetchPosts = async () => {
    if (!hasMore || !fetchCompleted.current) return;
    fetchCompleted.current = false; // Indicate fetch started

    const newPosts = await getFeed(currentUsername, page);

    setPosts((prevPosts) => {
      // check if newPost already exist in prevPosts, if so do not include it
      // eslint-disable-next-line no-underscore-dangle
      const filteredNewPosts = newPosts.filter((newPost) => !prevPosts.some((prevPost) => prevPost._id === newPost._id));
      const allPosts = [...prevPosts, ...filteredNewPosts];

      const sortByDate = (a, b) => new Date(b.created) - new Date(a.created);

      // Sort prevPosts by date in descending order
      const sortedPosts = allPosts.sort(sortByDate);
      return sortedPosts;
    });

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
    setInterval(async () => {
      setPage(1);
      await fetchPosts();
    }, 5000);
  }, [posts]);

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
            <PostList posts={posts} currentUser={currentUser} filter={filter} />
          </InfiniteScroll>
        )}
      </div>
    );
  }
}

export default ActivityFeed;
