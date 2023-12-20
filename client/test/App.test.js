/*eslint-disable*/
import React from 'react';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../src/App';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// const mock = new MockAdapter(axios);

// beforeAll(() => {
//   mock.onPost('/login').reply(200, {
//     data: {
//       apptoken: 'mockToken',
//       username: 'testUser',
//       profilePicture: 'mockProfilePicture',
//     },
//   });
// });

// afterAll(() => {
//   mock.restore();
// });

// test('handles login', async () => {
//   render(<App />);

//   // Assuming your login form has input fields with labels 'Username' and 'Password'
//   fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testUser' } });
//   fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testPassword' } });

//   // Get the button element by its role
//   const signInButton = screen.getByRole('button', { name: /Sign In/i });
//   fireEvent.click(signInButton);

//   // Wait for the asynchronous login process to complete
//   await waitFor(() => {
//     // Now you can make assertions based on the post-login state of your UI
//     // For example, you might check if the user profile is displayed
//     const userProfile = screen.getByTestId("activity-feed");
//     expect(userProfile).toBeInTheDocument();

//     // Tip: You can log additional information for debugging
//     // console.log('UI after login:', screen.debug());
//   });
// });

test('renders App component', () => {
  render(
    <App />
  );

  // Add more specific assertions if needed
  expect(screen.getByText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Username/i)).toBeInTheDocument();
});
