import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Header from '../../src/components/Header/header';
import axios from 'axios';

jest.mock('axios');

describe('<Header />', () => {
    const mockHandleLogout = jest.fn();
    const mockProps = {
        user: 'testUser',
        handleLogout: mockHandleLogout
    };

    beforeEach(() => {
        // Reset the mocked values before each test
        axios.get.mockResolvedValue({ data: {} });
    });

    it('renders the app name and links correctly', () => {
        render(
            <Router>
                <Header {...mockProps} />
            </Router>
        );

        expect(screen.getByText('Penn')).toBeInTheDocument();
        expect(screen.getByText('Connect')).toBeInTheDocument();
        expect(screen.getByText('Main Activity')).toBeInTheDocument();
        expect(screen.getByText('Chats')).toBeInTheDocument();
        expect(screen.getByText('Create Post')).toBeInTheDocument();
    });

    it('renders user profile picture from fetched data', async () => {
        axios.get.mockResolvedValue({ data: { profile: 'testProfile.jpg' } });
        render(
            <Router>
                <Header {...mockProps} />
            </Router>
        );

        const img = await screen.findByAltText(' profile-pic');
        expect(img.src).toBe('http://localhost/testProfile.jpg');
    });

    it('displays loading message while fetching data', () => {
        render(
            <Router>
                <Header {...mockProps} />
            </Router>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays error message on failed fetch', async () => {
        axios.get.mockRejectedValue(new Error('An error occurred'));
        render(
            <Router>
                <Header {...mockProps} />
            </Router>
        );

        const errorMessage = await screen.findByText('An error occurred');
        expect(errorMessage).toBeInTheDocument();
    });

    it('triggers handleLogout on logout button click', () => {
        render(
            <Router>
                <Header {...mockProps} />
            </Router>
        );
        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
        expect(mockHandleLogout).toHaveBeenCalledTimes(1);
    });
});