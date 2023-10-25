import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import UserInfo from '../../src/components/UserProfile/userInfo';

// Mock axios
jest.mock('axios');

// test for user profile page
describe('User component', () => {
  it('should update the state correctly', () => {
    render(<UserInfo />);

    // Your assertions on the component's behavior go here.
    // If you have code that triggers state updates, it's already wrapped in act by render.
    // You don't need to manually use act in this case.

    // Example assertion using screen (you can use other methods as needed):
    expect(screen.getByText('Some Text')).toBeInTheDocument();
  });
});
