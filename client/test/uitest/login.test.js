import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, jest } from '@jest/globals';
import renderer from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import Login from "../../src/components/LoginPage/login";
import axios from 'axios';
import { waitFor } from '@testing-library/react';

jest.mock('axios');

const mockHandleLogin = jest.fn();
describe("Login component", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<BrowserRouter><Login /></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders with username and password inputs", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("renders with 'Sign In' button", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test("renders with 'Sign up' link", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByRole('link', { name: /Sign up/i })).toBeInTheDocument();
  });

  test("renders with 'PennConnect' heading", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: /Penn Connect/i })).toBeInTheDocument();
  });
});

describe('Login Functionality', () => {
  test('renders login form', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign up/i })).toBeInTheDocument();
  });

  test('displays error message for missing username', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signInButton);

    expect(screen.getByText(/Please enter .* username/i)).toBeInTheDocument();
  });

  test('displays error message for missing password', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const usernameInput = screen.getByLabelText(/Username/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.click(signInButton);

    expect(screen.getByText(/Please enter .* password/i)).toBeInTheDocument();
  });

  test('displays error message for missing username and password', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.click(signInButton);

    expect(screen.getByText(/Please enter .* username .* password/i)).toBeInTheDocument();
  });

  test('displays error for incorrect username and password combination', async () => {
    // Mock the axios response for incorrect credentials
    axios.get.mockResolvedValue({ data: [] });

    render(<BrowserRouter><Login /></BrowserRouter>);
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(usernameInput, { target: { value: 'incorrectUser' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrectPass' } });
    fireEvent.click(signInButton);

    // Use findByText as this might be an async action
    const errorMsg = await screen.findByText(/Sorry, we don't recognize that combination of username and password. Please try again/i);
    expect(errorMsg).toBeInTheDocument();
  });

  test('submits the form on pressing the Enter key', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const usernameInput = screen.getByLabelText(/Username/i);

    // Simulate entering data and then pressing Enter key
    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.keyDown(usernameInput, { key: 'Enter', code: 'Enter' });

    // Check the error message since password is missing. This validates that pressing Enter initiated form submission
    expect(screen.getByText(/Please enter .* password/i)).toBeInTheDocument();
  });

  test('successfully logs in with correct username and password', async () => {
    const mockUser = { id: 1, username: 'testUser', password: 'testPass' };
    axios.get.mockResolvedValue({ data: [mockUser] });
    axios.patch.mockResolvedValue({ data: {} });

    render(
      <BrowserRouter>
        <Login handleLogin={mockHandleLogin} /> {/* Pass the mocked handleLogin */}
      </BrowserRouter>
    );
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPass' } });
    fireEvent.click(signInButton);

    await waitFor(() => {
        // Check if userToken is set in localStorage after successful login
        const token = localStorage.getItem('userToken');
        expect(token).toBeTruthy();
    });
  });

});
