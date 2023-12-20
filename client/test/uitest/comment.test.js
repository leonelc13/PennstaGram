/*eslint-disable*/
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom'; 
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Comment from '../../src/components/Post/Comment';
import AddComment from '../../src/components/Post/AddComment';
import * as postsApi from '../../src/api/posts'; // Import the posts API functions

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: 'postId' }), // Mock useParams
}));

// Mock the posts API functions
jest.mock('../../src/api/posts', () => ({
  getPostById: jest.fn().mockResolvedValue({
    id: 'postId',
    comments: [],
  }),
  addCommentToPost: jest.fn(), // Make sure this mock is correctly defined
}));

describe('Comment and Add Comment Component', () => {
  it('renders Comment component with CommentList and AddComment', () => {
    // Mock data
    const mockCurrentUser = 'testUser';
    const mockComments = [
      { id: 1, text: 'Comment 1' },
      { id: 2, text: 'Comment 2' },
    ];

    // Mock function for updatePost
    const mockUpdatePost = jest.fn();

    render(
      <MemoryRouter> {/* Wrap your component with MemoryRouter */}
        <Comment currentUser={mockCurrentUser} comments={mockComments} updatePost={mockUpdatePost} />
      </MemoryRouter>,
    );

    // Check if the "Comments" heading is present
    expect(screen.getByText('Comments')).toBeInTheDocument();

    // Check if CommentList and AddComment components are present
    expect(screen.getByTestId('comment-list')).toBeInTheDocument();
  });

  it('renders AddComment component and submits a comment', async () => {
    // Mock data
    const mockUpdatePost = jest.fn();
    const mockCurrentUsername = 'testUser';

    // Mock the getPostById API function
    postsApi.getPostById.mockResolvedValue({
      id: 'postId',
      comments: [],
    });

    await act(async ()=> {
        render(
        <MemoryRouter>
            <AddComment updatePost={mockUpdatePost} currentUsername={mockCurrentUsername} />
        </MemoryRouter>,
        );
    });

    fireEvent.change(screen.getByLabelText('Comment'), { target: { value: 'Test comment' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    // Wait for the asynchronous code to settle
    await waitFor(() => {
      // Check if the addCommentToPost function was called with the expected arguments
      expect(postsApi.addCommentToPost).toHaveBeenCalledWith(
        'postId',
        expect.arrayContaining([]), // Mock post comments array
        expect.objectContaining({
          id: expect.any(Number),
          content: 'Test comment',
          user: 'testUser',
        }),
      );
    });
  });
});
