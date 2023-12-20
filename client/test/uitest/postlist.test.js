/*eslint-disable*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // for extra matchers like toBeInTheDocument
import PostList from '../../src/components/PostList';

// Mocked data for testing
const mockedPosts = [
  {
    _id: '1',
    user: 'user1',
    content: 'Post content 1',
    isImage: true,
    url: 'image-url-1.jpg',
  },
  {
    _id: '2',
    user: 'user2',
    content: 'Post content 2',
    isImage: false,
    url: 'video-url-2.mp4',
  },
];

// Mock currentUser for testing
const mockCurrentUser = {
  username: 'testUser',
  following: ['user1'],
  hiddenPosts: ['2'],
};

test('renders PostList component with mocked data', () => {
  // Render the component with the mock data
  render(<Router> <PostList currentUser={mockCurrentUser} posts={mockedPosts} filter={true} /> </Router>);

  // Verify that the rendered posts are as expected
  const postPreviews = screen.getAllByTestId('post-preview');
  expect(postPreviews).toHaveLength(1);

  // Additional assertions based on your component's logic can be added here
  // For example, check if the correct user is displayed, content, etc.
  const postInfo = screen.getByText(/Posted by/i);
  expect(postInfo).toBeInTheDocument();
});

test('renders without filter', ()=>{
  render(<Router> <PostList currentUser={mockCurrentUser} posts={mockedPosts} filter={false} /> </Router>);

  // Verify that the rendered posts are as expected
  const postPreviews = screen.getAllByTestId('post-preview');
  expect(postPreviews).toHaveLength(2);

});