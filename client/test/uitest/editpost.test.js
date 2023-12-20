/*eslint-disable*/
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditPost from '../../src/components/Post/EditPost';
import { editPostById as realEditPostById } from '../../src/api/posts';

// Mock the API function
jest.mock('../../src/api/posts', () => ({
  ...jest.requireActual('../../src/api/posts'),
  editPostById: jest.fn(),
}));

describe('EditPost Component', () => {
  it('renders EditPost component with form elements', () => {
    // Mock data
    const mockPost = {
      _id: '123',
      content: 'Sample post content',
    };

    // Mock function for setPost
    const setPostMock = jest.fn();

    render(<EditPost setPost={setPostMock} post={mockPost} />);

    // Check if the "Edit Post" header and submit button are present
    expect(screen.getByText('Edit Post')).toBeInTheDocument();
    expect(screen.getByText('Submit Edit')).toBeInTheDocument();

    // Check if the content textarea, file input, and radio buttons are present
    expect(screen.getByLabelText('Content')).toBeInTheDocument();
  });

  it('submits the form with new content', async () => {
    // Mock data
    const mockPost = {
      _id: '123',
      content: 'Sample post content',
    };
  
    // Mock function for setPost
    const setPostMock = jest.fn();
  
    render(<EditPost setPost={setPostMock} post={mockPost} />);
  
    // Simulate user interaction: change content and submit form
    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'New content' } });
    fireEvent.submit(screen.getByTestId('edit-form'));
  
    // Wait for the asynchronous code to settle
    await waitFor(() => {
      // Check if editPostById was called with the expected arguments
      expect(realEditPostById).toHaveBeenCalledWith('123', expect.objectContaining({ content: 'New content' }));
    });
  });

});
