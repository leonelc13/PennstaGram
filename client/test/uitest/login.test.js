import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, jest } from '@jest/globals';
import renderer from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import Login from "../../src/components/LoginPage/login";
import axios from 'axios';
import { rootURL } from '../../src/utils/utils';

jest.mock('axios');
const jsonURL = rootURL;

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

describe("Login Functionality Tests", () => {

  test("successful login with valid credentials", async () => {
    const mockResponse = { data: { apptoken: 'token', username: 'testUser' } };
    axios.post.mockResolvedValue(mockResponse);

    render(<BrowserRouter><Login handleLogin={mockHandleLogin} /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'validUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'validPass' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${jsonURL}/login`, expect.any(String));
      expect(mockHandleLogin).toHaveBeenCalledWith(mockResponse);
    });
  });

  test("displays error for invalid credentials", async () => {
    const mockError = { response: { data: { error: 'Invalid credentials' } } };
    axios.post.mockRejectedValue(mockError);

    render(<BrowserRouter><Login handleLogin={mockHandleLogin} /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'invalidUser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'invalidPass' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });
});
