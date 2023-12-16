/*eslint-disable*/
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import UserInfo from '../../src/components/UserProfile/userInfo';
import axios from 'axios';
import { checkFolloing, getUserById } from '../../src/api/users';

// Mock axios
const mockUser = {
    username: 'testuser',
    userid: 'testuser',
    bio: 'Bio',
    followers: ['Alice'],
    following: ['Sunny']
}

// jest.mock('axios', () => ({
//     get: () => Promise.resolve({ data: mockUser }),
// }));
// Mock the functions used in your component
jest.mock('axios');
jest.mock('../../src/api/users', () => ({
    checkFolloing: jest.fn(),
    getUserById: jest.fn(),
  }));

// test for user profile page
describe('User component', () => {
//     it('should update the state correctly', async () => {
//         const component = await act( async () => render(<BrowserRouter> <UserInfo /> </BrowserRouter>));
//         expect(screen.getByText('Bio')).toBeInTheDocument();
//   });
  it('should update the state correctly', async () => {
    // Mock the Axios get function to resolve with your mock user data
    axios.get.mockResolvedValue({ data: mockUser });

    // Mock the API functions used in the component
    checkFolloing.mockResolvedValue(true);
    getUserById.mockResolvedValue(mockUser);

    await act(async () => render(<BrowserRouter> <UserInfo currentUser={{ username: 'currentUser' }} targetUsername="testuser" setCurrentUser={jest.fn()} /> </BrowserRouter>));

    // Assert that the component renders correctly
    expect(screen.getByText('Bio')).toBeInTheDocument();
  });
});
