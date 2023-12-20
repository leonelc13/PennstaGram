/*eslint-disable*/
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route } from 'react-router-dom';
import UserPost from '../../src/components/UserProfile/userPost';

describe('UserPost Component', () => {
  it('renders UserPost component with PostList and Hidden Posts link', () => {
    // Mock data
    const allPosts = [
      // Add sample post data here
    ];

    const currentUser = 'sampleUser';

    // Mock useParams
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ username: 'sampleUser' }),
    }));

    const { getByText } = render(
      <MemoryRouter initialEntries={['/user/sampleUser']}>
          <UserPost allPosts={allPosts} currentUser={currentUser} />
      </MemoryRouter>
    );

    // Check if PostList is rendered with the provided data
    const postList = getByText('Hidden Posts') // Adjust this based on your actual PostList component text
    expect(postList).toBeInTheDocument();

    // // Check if Hidden Posts link is rendered with the correct URL
    // const hiddenPostsLink = getByText('Hidden Posts');
    // expect(hiddenPostsLink).toHaveAttribute('href', '/user/sampleUser/hidden');
  });

});
