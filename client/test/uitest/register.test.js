import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, jest } from '@jest/globals';
import { render, screen, fireEvent, act } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Register from "../../src/components/RegisterPage/register";
import axios from 'axios';
jest.mock('axios');

describe("Register component", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<BrowserRouter><Register /></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders with username and password inputs", () => {
    render(<BrowserRouter><Register /></BrowserRouter>);
    expect(screen.getByLabelText(/Pick a Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pick a Password/i)).toBeInTheDocument();
  });

  test("renders with 'Sign Up' button", () => {
    render(<BrowserRouter><Register /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test("renders with 'sign in' link", () => {
    render(<BrowserRouter><Register /></BrowserRouter>);
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  test("renders with 'PennConnect' heading", () => {
    render(<BrowserRouter><Register /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: /Penn Connect/i })).toBeInTheDocument();
  });

  describe('Registration Functionality', () => {
    test('displays error message for missing username', async () => {
      render(<BrowserRouter><Register /></BrowserRouter>);
      const passwordInput = screen.getByLabelText(/Pick a Password/i);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.change(passwordInput, { target: { value: 'newuser' } });
        fireEvent.click(signUpButton);
      });

      expect(screen.getByText(/Please enter a username/i)).toBeInTheDocument();
    });

    test('displays error message for missing password', async () => {
      render(<BrowserRouter><Register /></BrowserRouter>);
      const usernameInput = screen.getByLabelText(/Pick a Username/i);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.change(usernameInput, { target: { value: 'newuser' } });
        fireEvent.click(signUpButton);
      });

      expect(screen.getByText(/Please enter a password/i)).toBeInTheDocument();
    });

    test('displays error message for missing username and password', async () => {
      render(<BrowserRouter><Register /></BrowserRouter>);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
      
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.click(signUpButton);
      });

      expect(screen.getByText(/Please enter both a username and password/i)).toBeInTheDocument();
    });

    test('redirects to login page on click of "sign in" link', () => {
      render(<BrowserRouter><Register /></BrowserRouter>);
      const signInLink = screen.getByRole('link', { name: /sign in/i });

      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        fireEvent.click(signInLink);
      });
    });

    test('registers a new user successfully', async () => {
      // Mock successful axios requests
      axios.get.mockResolvedValue({ data: [] }); // No users with the given username
      axios.post.mockResolvedValue({}); // Successful registration
      
      render(<BrowserRouter><Register /></BrowserRouter>);
      
      const usernameInput = screen.getByLabelText(/Pick a Username/i);
      const passwordInput = screen.getByLabelText(/Pick a Password/i);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
      
      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        fireEvent.change(usernameInput, { target: { value: 'username' } });
        fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
        fireEvent.click(signUpButton);
      });
    });
  
    test('submits form on "Enter" key press', () => {
      render(<BrowserRouter><Register /></BrowserRouter>);

      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
      });
      
      expect(screen.getByText(/Please enter both a username and password/i)).toBeInTheDocument();
    });

    test('displays error message if username is already taken', async () => {
      // Mock a GET request where the username is already in the system
      axios.get.mockResolvedValue({ data: [{ username: 'newuser' }] });
      
      render(<BrowserRouter><Register /></BrowserRouter>);
      
      const usernameInput = screen.getByLabelText(/Pick a Username/i);
      const passwordInput = screen.getByLabelText(/Pick a Password/i);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
      
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.change(usernameInput, { target: { value: 'newuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(signUpButton);
      });
      
      const errorMessage = await screen.findByText(/Username is already taken/i);
      expect(errorMessage).toBeInTheDocument();
    });

    test('displays error message from server after registration attempt', async () => {
      // Mock successful GET request (no existing user) but error in POST request
      axios.get.mockResolvedValue({ data: [] });
      axios.post.mockResolvedValue({ data: { error: 'Registration failed.' } });
      
      render(<BrowserRouter><Register /></BrowserRouter>);
      
      const usernameInput = screen.getByLabelText(/Pick a Username/i);
      const passwordInput = screen.getByLabelText(/Pick a Password/i);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
      
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await act(async () => {
        fireEvent.change(usernameInput, { target: { value: 'newuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(signUpButton);
      });
      
      expect(screen.getByText(/Registration failed./i)).toBeInTheDocument();
    });
  });
});
