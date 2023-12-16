/*eslint-disable*/
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostView from '../../src/components/Post/PostView';
import { updatePostLikesAndLikedBy } from '../../src/api/posts';

jest.mock('../../src/api/posts');

const mockPost = {
  _id: '123',
  title: 'Test Post',
  content: 'Test post content',
  user: 'testUser',
  isImage: true,
  url: 'https://example.com/image.jpg',
  likes: 10,
  likedBy: ['user1', 'user2'],
};

describe('PostView component', () => {
    it('renders post details and handles likes', async () => {
        // Mock setPost function
        const setPost = jest.fn();
      
        await act(async () => {
          render(<PostView post={mockPost} currentUsername="user3" setPost={setPost} />);
        });
      
        // Assert that post details are rendered
        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText('Test post content')).toBeInTheDocument();
      
        // Assert that the like button is rendered
        const likeButton = screen.getByRole('button', { name: /likes/ });
        expect(likeButton).toBeInTheDocument();
      
        // Mock the API call
        updatePostLikesAndLikedBy.mockResolvedValueOnce({
          value: { likes: 11, likedBy: ['user1', 'user2', 'user3'] },
        });
      
        // Simulate a click on the like button
        fireEvent.click(likeButton);
      
        // Wait for the asynchronous operations to complete
        await act(async () => {});
      
        // Assert that the API function is called with the correct parameters
        expect(updatePostLikesAndLikedBy).toHaveBeenCalledWith('123', 11, ['user1', 'user2', 'user3']);
 
      });
      
});
