import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import UserInfo from '../../src/components/UserProfile/userInfo';

// Mock axios
const mockUser = {
    username: 'testuser',
    userid: 'testuser',
    bio: 'Bio',
    followers: ['Alice'],
    following: ['Sunny']
}

jest.mock('axios', () => ({
    get: () => Promise.resolve({ data: mockUser }),
}));

// test for user profile page
describe('User component', () => {
    it('should update the state correctly', async () => {
        const component = await act( async () => render(<BrowserRouter> <UserInfo /> </BrowserRouter>));
        expect(screen.getByText('Bio')).toBeInTheDocument();
  });
});
