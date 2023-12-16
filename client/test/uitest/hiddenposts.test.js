/*eslint-disable*/
import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import { expect, test } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer'; // Import renderer
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import HiddenPost from '../../src/components/UserProfile/hiddenPosts';
import { getUserById } from '../../src/api/users';
import { getAllPostIds, getHiddenPostByUser } from '../../src/api/posts';

jest.mock('../../src/api/users');
jest.mock('../../src/api/posts');

const mockCurrentUser = {
  username: 'testUser',
  // other fields...
};

const mockHiddenPosts = [
  {
    _id: 'hiddenPostId1',
    // other fields...
  },
];

const mockAllPostIds = [
  {
    _id: 'postId1',
    // other fields...
  },
];

describe('HiddenPost component', () => {
  beforeEach(() => {
    // Reset mock implementations before each test
    jest.clearAllMocks();

    // Mock the API functions
    getUserById.mockResolvedValueOnce(mockCurrentUser);
    getHiddenPostByUser.mockResolvedValueOnce(mockHiddenPosts);
    getAllPostIds.mockResolvedValueOnce(mockAllPostIds);
  });

  test("renders correctly", () => {
    const tree = renderer.create(<BrowserRouter><HiddenPost currentUsername="testUser" /></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders hidden posts for the current user', async () => {
    render(
      <BrowserRouter>
        <HiddenPost currentUsername="testUser" />
      </BrowserRouter>
    );

    // Wait for the component to render and load data
    await waitFor(() => {
      expect(screen.getByTestId('post-list')).toBeInTheDocument(); // Adjust the text based on your actual data
    });
  });
});
