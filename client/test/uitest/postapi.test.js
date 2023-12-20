/*eslint-disable*/
import axios from 'axios';
import {
  getAllPosts,
  getAllPostIds,
  getFeed,
  getPostById,
  getHiddenPostByUser,
  getPostsByUser,
  createPost,
  editPostById,
  updatePostLikesAndLikedBy,
} from '../../src/api/posts'; // Adjust the path based on your project structure

// Mock the axios library
jest.mock('axios');

describe('userPosts Module', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods of the mock
    jest.clearAllMocks();
  });

  describe('getAllPosts', () => {
    test('should fetch all posts successfully', async () => {
      const responseData = [{ postId: 1, content: 'Post content' }];
      axios.get.mockResolvedValue({ data: responseData });

      const result = await getAllPosts(1, 5);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/posts'), { params: { page: 1, limit: 5 } });
      expect(result).toEqual(responseData);
    });

    test('should handle error during fetch', async () => {
      const errorMessage = 'Error fetching posts';
      axios.get.mockRejectedValue(new Error(errorMessage));

      const result = await getAllPosts(1, 5);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/posts'), { params: { page: 1, limit: 5 } });
      expect(result).toEqual(errorMessage);
    });
  });

  describe('getAllPostIds', () => {
    test('should fetch all post ids successfully', async () => {
      const responseData = [1, 2, 3];
      axios.get.mockResolvedValue({ data: responseData });

      const result = await getAllPostIds();

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/postIds'));
      expect(result).toEqual(responseData);
    });

    test('should handle error during fetch', async () => {
      const errorMessage = 'Error fetching post ids';
      axios.get.mockRejectedValue(new Error(errorMessage));

      const result = await getAllPostIds();

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/postIds'));
      expect(result).toEqual(errorMessage);
    });
  });

  describe('getFeed', () => {
    // Similar tests as getAllPosts can be written for getFeed
    test('should fetch feed successfully', async () => {
      const username = 'testUser';
      const page = 1;
      const responseData = [{ postId: 1, content: 'Post content' }];
      axios.get.mockResolvedValue({ data: responseData });

      const result = await getFeed(username, page);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/feed/${username}`), { params: { page, limit: 5 } });
      expect(result).toEqual(responseData);
    });

    test('should fetch feed with custom limit successfully', async () => {
      const username = 'testUser';
      const page = 1;
      const customLimit = 10;
      const responseData = [{ postId: 1, content: 'Post content' }];
      axios.get.mockResolvedValue({ data: responseData });

      const result = await getFeed(username, page, customLimit);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/feed/${username}`), { params: { page, limit: customLimit } });
      expect(result).toEqual(responseData);
    });

    test('should handle error during fetch', async () => {
      const username = 'testUser';
      const page = 1;
      const errorMessage = 'Error fetching feed';
      axios.get.mockRejectedValue(new Error(errorMessage));

      const result = await getFeed(username, page);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/feed/${username}`), { params: { page, limit: 5 } });
      expect(result).toEqual(errorMessage);
    });
  });

  describe('getPostById', () => {
    test('should fetch post by ID successfully', async () => {
      const postId = 123;
      const responseData = { postId, content: 'Post content' };
      axios.get.mockResolvedValue({ data: responseData });

      const result = await getPostById(postId);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/posts/${postId}`));
      expect(result).toEqual(responseData);
    });

    test('should handle error during fetch', async () => {
      const postId = 123;
      const errorMessage = 'Error fetching post by ID';
      axios.get.mockRejectedValue(new Error(errorMessage));

      const result = await getPostById(postId);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/posts/${postId}`));
      expect(result).toEqual(errorMessage);
    });
  });

  describe('getHiddenPostByUser and getPostsByUser', () => {
    beforeEach(() => {
      // Clear all instances and calls to constructor and all methods of the mock
      jest.clearAllMocks();
    });

    test('should fetch hidden posts by user successfully', async () => {
      const username = 'testUser';
      const responseData = [{ postId: 1, content: 'Hidden post content' }];
      axios.get.mockResolvedValue({ data: responseData });

      const result = await getHiddenPostByUser(username);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/posts/hidden/${username}`));
      expect(result).toEqual(responseData);
    });

    test('should handle error during fetch of hidden posts', async () => {
      const username = 'testUser';
      const errorMessage = 'Error fetching hidden posts';
      axios.get.mockRejectedValue(new Error(errorMessage));

      const result = await getHiddenPostByUser(username);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/posts/hidden/${username}`));
      expect(result).toEqual(errorMessage);
    });

    test('should fetch posts by user successfully', async () => {
      const username = 'testUser';
      const responseData = [{ postId: 1, content: 'Post content' }];
      axios.get.mockResolvedValue({ data: responseData });

      const result = await getPostsByUser(username);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/posts/byUser/${username}`));
      expect(result).toEqual(responseData);
    });

    test('should handle error during fetch of posts by user', async () => {
      const username = 'testUser';
      const errorMessage = 'Error fetching posts by user';
      axios.get.mockRejectedValue(new Error(errorMessage));

      const result = await getPostsByUser(username);

      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/posts/byUser/${username}`));
      expect(result).toEqual(errorMessage);
    });
  });

  describe('createPost', () => {
    test('should create a post successfully', async () => {
      const postData = { /* your post data */ };
      const responseData = { /* mocked response data */ };
      
      // Mock the axios.post function
      axios.post.mockResolvedValue({ data: responseData });
  
      // Call the function
      const result = await createPost(postData);
  
      // Assertions
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/posts'), postData);
      expect(result).toEqual(responseData);
    });
  
    test('should handle create post failure', async () => {
      const postData = { /* your post data */ };
      const errorMessage = 'Failed to create post';
  
      // Mock the axios.post function to simulate an error
      axios.post.mockRejectedValue({ message: errorMessage });
  
      // Call the function
      const result = await createPost(postData);
  
      // Assertions
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/posts'), postData);
      expect(result).toEqual({ error: errorMessage });
    });
  });
  
  describe('editPostById', () => {
    test('should edit a post by ID successfully', async () => {
      const postId = 123;
      const postData = { /* your post data */ };
      const responseData = { value: 'Post edited successfully' };
  
      // Mock the axios.put function
      axios.put.mockResolvedValue({ data: responseData });
  
      // Call the function
      const result = await editPostById(postId, postData);
  
      // Assertions
      expect(axios.put).toHaveBeenCalledWith(expect.stringContaining(`/posts/${postId}`), postData);
      expect(result).toEqual(responseData.value);
    });
  
    test('should handle edit post failure', async () => {
      const postId = 123;
      const postData = { /* your post data */ };
      const errorMessage = 'Failed to edit post';
  
      // Mock the axios.put function to simulate an error
      axios.put.mockRejectedValue({ message: errorMessage });
  
      // Call the function
      const result = await editPostById(postId, postData);
  
      // Assertions
      expect(axios.put).toHaveBeenCalledWith(expect.stringContaining(`/posts/${postId}`), postData);
      expect(result).toEqual(errorMessage);
    });
  });

  describe('updatePostLikesAndLikedBy', () => {
    test('should update post likes and likedBy successfully', async () => {
      const postId = 123;
      const likesCount = 5;
      const usersLiked = ['user1', 'user2'];
      const responseData = { data: 'Post updated successfully' };
  
      // Mock the axios.put function
      axios.put.mockResolvedValue(responseData);
  
      // Call the function
      const result = await updatePostLikesAndLikedBy(postId, likesCount, usersLiked);
  
      // Assertions
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining(`/posts/${postId}`),
        { likes: likesCount, likedBy: usersLiked }
      );
      expect(result).toEqual(responseData.data);
    });
  
    test('should handle update post failure', async () => {
      const postId = 123;
      const likesCount = 5;
      const usersLiked = ['user1', 'user2'];
      const errorMessage = 'Failed to update post';
  
      // Mock the axios.put function to simulate an error
      axios.put.mockRejectedValue({ message: errorMessage });
  
      // Call the function
      const result = await updatePostLikesAndLikedBy(postId, likesCount, usersLiked);
  
      // Assertions
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining(`/posts/${postId}`),
        { likes: likesCount, likedBy: usersLiked }
      );
      expect(result).toEqual(errorMessage);
    });
  });
});
