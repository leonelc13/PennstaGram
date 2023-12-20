/*eslint-disable*/
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers

import FollowButton from '../../src/components/UserProfile/Follow';
import { followUser, unfollowUser, getUserById } from '../../src/api/users';

// Mock the API functions
jest.mock('../../src/api/users');

// Mock setCurrentUser function
const setCurrentUserMock = jest.fn();

const defaultProps = {
  currentUser: 'currentUserId',
  targetUser: 'targetUserId',
  isFollowing: false,
  setIsFollowing: jest.fn(),
  setCurrentUser: setCurrentUserMock,
};

test('renders FollowButton correctly', () => {
  const { getByText } = render(<FollowButton {...defaultProps} />);

  expect(getByText('Follow')).toBeInTheDocument();
});

test('handles follow button click', async () => {
  followUser.mockResolvedValue(true);
  getUserById.mockResolvedValue({}); // Mock the response, adjust based on your actual API response

  const { getByText } = render(<FollowButton {...defaultProps} />);

  fireEvent.click(getByText('Follow'));

  // Wait for asynchronous operations to complete
  await waitFor(() => {
    expect(setCurrentUserMock).toHaveBeenCalledTimes(1);
    expect(defaultProps.setIsFollowing).toHaveBeenCalledWith(true);
  });
});

test('handles unfollow button click', async () => {
  unfollowUser.mockResolvedValue(true);
  getUserById.mockResolvedValue({}); // Mock the response, adjust based on your actual API response

  const { getByText } = render(<FollowButton {...defaultProps} isFollowing />);

  fireEvent.click(getByText('Unfollow'));

  // Wait for asynchronous operations to complete
  await waitFor(async () => {
    // Check the expectations
    expect(setCurrentUserMock).toHaveBeenCalledTimes(2);
    expect(defaultProps.setIsFollowing).toHaveBeenCalledWith(false);
  });
});


