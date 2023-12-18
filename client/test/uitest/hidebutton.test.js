/*eslint-disable*/
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HideButton from '../../src/components/Post/HideButton';
import { addHiddenPost, removeHiddenPost } from '../../src/api/users';

jest.mock('../../src/api/users', () => ({
    addHiddenPost: jest.fn(() => Promise.resolve({})),
    removeHiddenPost: jest.fn(() => Promise.resolve({})),
  }));

const mockCurrentUser = {
  username: 'testUser',
  hiddenPosts: ['postId1', 'postId2'],
};

describe('HideButton component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Hide Post button when post is not hidden', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HideButton currentUser={mockCurrentUser} id="postId1" setUser={jest.fn()} />
      </MemoryRouter>
    );
  
    expect(screen.getByText('Unhide Post')).toBeInTheDocument();
  });

  it('renders Unhide Post button when post is hidden', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
          <HideButton currentUser={mockCurrentUser} id="postId3" setUser={jest.fn()} />
        </MemoryRouter>
      );
    
    expect(screen.getByText('Hide Post')).toBeInTheDocument();
  });

  it('handles clicking on the button to hide/unhide post', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <HideButton currentUser={mockCurrentUser} id="postId3" setUser={jest.fn()} />
      </MemoryRouter>
    );

    const hideButton = screen.getByText('Hide Post');
    screen.debug();
    fireEvent.click(hideButton);

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      expect(addHiddenPost).toHaveBeenCalledWith('testUser', 'postId3');
    });
    screen.debug();
  });
});
