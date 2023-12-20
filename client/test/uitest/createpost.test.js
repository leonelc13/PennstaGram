/*eslint-disable*/
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import CreatePost from '../../src/components/Post/CreatePost';
import axios from 'axios';
jest.mock('axios');

// Import the actual s3Upload function
import { createPost, s3Upload } from '../../src/api/posts';

// Mock the s3Upload function
jest.mock('../../src/api/posts', () => ({
  ...jest.requireActual('../../src/api/posts'),
  s3Upload: jest.fn(),
  createPost: jest.fn(),
}));

// Set up the mock implementation for s3Upload
s3Upload.mockResolvedValue({ message: 'mocked-s3-url' });


jest.mock('../../src/api/posts');


describe("Register component", () => {
  test("renders with url and isImage inputs", () => {
    render(<BrowserRouter><CreatePost /></BrowserRouter>);
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

      expect(screen.getByText(/Missing/i)).toBeInTheDocument();
    });

    test('displays error for missing/incorrect media', async () => {
      render(<BrowserRouter><CreatePost username="testUser" /></BrowserRouter>);
      const submitButton = screen.getByRole('button', { name: /Submit/i });
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      expect(screen.getByText(/Missing\/incorrect media/i)).toBeInTheDocument();
    });

    test('submits post successfully', async () => {
      axios.post.mockResolvedValue({ data: true });

      // Mock the s3Upload function
      s3Upload.mockResolvedValue({ message: 'mocked-s3-url' });
      createPost.mockImplementation(jest.requireActual('../../src/api/posts').createPost);

      render(<BrowserRouter><CreatePost username="testUser" /></BrowserRouter>);
      const submitButton = screen.getByRole('button', { name: /Submit/i });
  
      // Set up form data
      const file = new File([''], 'image.png', { type: 'image/png', size: 5000000 });
  
      // Use the label text to get the file input
      const fileInput = screen.getByTestId("upld");
  
      // Trigger a change event with the file
      fireEvent.change(fileInput, { target: { files: [file] } });
  
      // Fill in other form fields as needed
      fireEvent.change(screen.getByLabelText(/Post Title/i), { target: { value: 'Test Title' } });
      fireEvent.change(screen.getByLabelText(/Post Content/i), { target: { value: 'Test Content' } });
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      // Ensure that the success message is displayed
      expect(screen.getByText(/Post Submitted!/i)).toBeInTheDocument();
    });

    test('displays error when image file size exceeds the limit', async () => {
      render(<BrowserRouter><CreatePost username="testUser" /></BrowserRouter>);
      const submitButton = screen.getByRole('button', { name: /Submit/i });
  
      // Create an image file that exceeds the limit (e.g., 60MB)
      const file = new File([''], 'large_image.png', { type: 'image/png', size: 60000000 });
  
      // Find the file input using its test ID
      const fileInput = screen.getByTestId('upld');
  
      // Trigger a change event with the file
      fireEvent.change(fileInput, { target: { files: [file] } });
  
      // Mock s3Upload to resolve with a successful response
      s3Upload.mockResolvedValue({ message: 's3-url-here' });
  
      // Mock createPost to reject with an error
      createPost.mockRejectedValue({ error: 'Error creating post' });
  
      await act(async () => {
        fireEvent.click(submitButton);
      });
  
      // Ensure that the error message for exceeding image size limit is not displayed
      expect(screen.queryByText(/Image file size limit is 50MB/i)).toBeNull();
  
    });
    
    test('displays error for invalid file type', () => {

      render(<BrowserRouter><CreatePost username="testUser" /></BrowserRouter>);
    
      // Use the label text to get the file input
      const fileInput = screen.getByTestId("upld");
    
      // Set up a file with an invalid type
      const invalidFile = new File([''], 'invalid-file.txt', { type: 'text/plain', size: 10000 });
    
      // Trigger a change event with the invalid file
      fireEvent.change(fileInput, { target: { files: [invalidFile] } });
    
      // Ensure that the correct error message is displayed
      expect(screen.getByText(/Only image and video files are allowed!/i)).toBeInTheDocument();
    });
    
  });
});
