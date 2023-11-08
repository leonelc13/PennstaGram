import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import CreatePost from '../../src/components/Post/CreatePost';
import axios from 'axios';
jest.mock('axios');

describe("Register component", () => {
  test("renders with url and isImage inputs", () => {
    render(<BrowserRouter><CreatePost /></BrowserRouter>);
    expect(screen.getByText(/Post URL/i)).toBeInTheDocument();
    expect(screen.getByText(/Image/i)).toBeInTheDocument();
    expect(screen.getByText(/Video/i)).toBeInTheDocument();
  });

  test("renders with 'Submit' button", () => {
    render(<BrowserRouter><CreatePost /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  describe('Registration Functionality', () => {
    test('displays error message for missing url', async () => {
      render(<BrowserRouter><CreatePost /></BrowserRouter>);
      const signUpButton = screen.getByRole('button', { name: /Submit/i });

      await act(async () => {
        fireEvent.click(signUpButton);
      });

      expect(screen.getByText(/Missing media to post/i)).toBeInTheDocument();
    });

    test('creates a new post successfully', async () => {
      // Mock successful axios requests
      axios.post.mockResolvedValue({data: true}); // Successful creation
      
      render(<BrowserRouter><CreatePost /></BrowserRouter>);
      const urlInput = screen.getByLabelText(/Post URL/i);
      const isImageInput = screen.getByLabelText(/Image/i);
      const signUpButton = screen.getByRole('button', { name: /Submit/i });
      
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.change(urlInput, { target: { value: 'www.google.com' } });
        fireEvent.change(isImageInput, { target: { value: true } });
        fireEvent.click(signUpButton);
      });

      expect(screen.getByText(/Post Submitted!/i)).toBeInTheDocument();
    });

    test('shows error if create post returns error', async () => {
      // Mock successful axios requests
      axios.post.mockResolvedValue({data: { error: 'error message' } }); // Response resolves, but to error
      
      render(<BrowserRouter><CreatePost /></BrowserRouter>);
      const urlInput = screen.getByLabelText(/Post URL/i);
      const isImageInput = screen.getByLabelText(/Image/i);
      const signUpButton = screen.getByRole('button', { name: /Submit/i });
      
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.change(urlInput, { target: { value: 'www.google.com' } });
        fireEvent.change(isImageInput, { target: { value: true } });
        fireEvent.click(signUpButton);
      });

      expect(screen.getByText(/error message/i)).toBeInTheDocument();
    });

    test('shows error if create post fails', async () => {
      // Mock successful axios requests
      axios.post.mockReturnValue(Promise.reject({response: {data: {error: 'error message'}}})); // Response rejects
      
      render(<BrowserRouter><CreatePost /></BrowserRouter>);
      const urlInput = screen.getByLabelText(/Post URL/i);
      const isImageInput = screen.getByLabelText(/Image/i);
      const signUpButton = screen.getByRole('button', { name: /Submit/i });
      
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.change(urlInput, { target: { value: 'www.google.com' } });
        fireEvent.change(isImageInput, { target: { value: true } });
        fireEvent.click(signUpButton);
      });

      expect(screen.getByText(/error message/i)).toBeInTheDocument();
    });
  
  //   test('submits form on "Enter" key press', () => {
  //     render(<BrowserRouter><Register /></BrowserRouter>);

  //     // eslint-disable-next-line testing-library/no-unnecessary-act
  //     act(() => {
  //       fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
  //     });
      
  //     expect(screen.getByText(/Please enter both a username and password/i)).toBeInTheDocument();
  //   });

  //   test('displays error message if username is already taken', async () => {
  //     // Mock a GET request where the username is already in the system
  //     axios.get.mockResolvedValue({ data: [{ username: 'newuser' }] });
      
  //     render(<BrowserRouter><Register /></BrowserRouter>);
      
  //     const usernameInput = screen.getByLabelText(/Pick a Username/i);
  //     const passwordInput = screen.getByLabelText(/Pick a Password/i);
  //     const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
      
  //     // eslint-disable-next-line testing-library/no-unnecessary-act
  //     await act(async () => {
  //       fireEvent.change(usernameInput, { target: { value: 'newuser' } });
  //       fireEvent.change(passwordInput, { target: { value: 'password' } });
  //       fireEvent.click(signUpButton);
  //     });
      
  //     const errorMessage = await screen.findByText(/Username is already taken/i);
  //     expect(errorMessage).toBeInTheDocument();
  //   });

  //   test('displays error message from server after registration attempt', async () => {
  //     // Mock successful GET request (no existing user) but error in POST request
  //     axios.get.mockResolvedValue({ data: [] });
  //     axios.post.mockResolvedValue({ data: { error: 'Registration failed.' } });
      
  //     render(<BrowserRouter><Register /></BrowserRouter>);
      
  //     const usernameInput = screen.getByLabelText(/Pick a Username/i);
  //     const passwordInput = screen.getByLabelText(/Pick a Password/i);
  //     const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
      
  //     // eslint-disable-next-line testing-library/no-unnecessary-act
  //     await act(async () => {
  //       fireEvent.change(usernameInput, { target: { value: 'newuser' } });
  //       fireEvent.change(passwordInput, { target: { value: 'password' } });
  //       fireEvent.click(signUpButton);
  //     });
      
  //     expect(screen.getByText(/Registration failed./i)).toBeInTheDocument();
  //   });
  });
});
