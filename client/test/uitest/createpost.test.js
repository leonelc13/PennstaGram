import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import CreatePost from '../../src/components/Post/CreatePost';
import axios from 'axios';
jest.mock('axios');

describe("create post component", () => {
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

  describe('create post Functionality', () => {
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
  });
});
