import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import Login from "../../src/components/LoginPage/login";

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

  test("renders with 'PennBuzz' heading", () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByRole('heading', { name: /Penn Buzz/i })).toBeInTheDocument();
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

    expect(screen.getByText(/Missing username/i)).toBeInTheDocument();
  });

  test('displays error message for missing password', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const usernameInput = screen.getByLabelText(/Username/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.click(signInButton);

    expect(screen.getByText(/Missing password/i)).toBeInTheDocument();
  });

  test('displays error message for missing username and password', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.click(signInButton);

    expect(screen.getByText(/Missing username and password/i)).toBeInTheDocument();
  });

});
