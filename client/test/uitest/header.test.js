/*eslint-disable*/
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../../src/components/Header/Header';
import { getUserById } from '../../src/api/users';

jest.mock('../../src/api/users');

describe('Header Component', () => {
  const currentUser = 'testUser';

  beforeEach(() => {
    // Mock the getUserById function
    getUserById.mockResolvedValue({
      username: 'testUser',
      profile: 'test-profile-image-url',
    });
  });

  it('renders header with user profile picture and navigation links', async () => {
    await act( async ()=>  render(
      <BrowserRouter>
        <Header currentUser={currentUser} handleLogout={() => {}} />
      </BrowserRouter>
    ));

    // Wait for the component to load and render

    waitFor(() => {
        expect(screen.getByTestId('header-container')).toBeInTheDocument();
        expect(screen.getByText(/Penn Connect/i)).toBeInTheDocument();
        expect(screen.getByText(/Main Activity/i)).toBeInTheDocument();
        expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
        expect(screen.getByTestId('user-profile-picture-wrapper')).toBeInTheDocument();
    });

  });
});
