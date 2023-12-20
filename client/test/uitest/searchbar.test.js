/*eslint-disable*/
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Bar from '../../src/components/SearchBar/Bar';
import { getAllUsers } from '../../src/api/users';

import SearchBar from '../../src/components/SearchBar/SearchBar';

jest.mock('../../src/api/users', () => ({
  getAllUsers: jest.fn(() => Promise.resolve([{ username: 'user1' }, { username: 'user2' }, { username: 'user3' }])),
}));

describe('SearchBar component', () => {
    test('renders search input and filters results', async () => {
      const setSearchResultsMock = jest.fn();
      getAllUsers.mockResolvedValue([{ username: 'user1' }, { username: 'user2' }, { username: 'user3' }]);
  
      await act(async ()=> render(<SearchBar setSearchResults={setSearchResultsMock} />));
  
      const searchInput = screen.getByTestId('a');
  
      await act(async () => {
        userEvent.type(searchInput, 'user');
        await waitFor(() => {
          expect(setSearchResultsMock).toHaveBeenCalled();
        });
      });
    });
  });

describe('Bar component', () => {
  test('renders search bar and search results', () => {
    const currentUser = 'testUser';

    // Mock the setSearchResults function
    const setSearchResultsMock = jest.fn();

    render(<Bar currentUser={currentUser} />);

    // Check if the search bar is rendered
    const searchBar = screen.getByTestId('a');
    expect(searchBar).toBeInTheDocument();
  });
});
