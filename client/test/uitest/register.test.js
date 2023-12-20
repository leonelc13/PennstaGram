import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Register from "../../src/components/RegisterPage/register";
import axios from 'axios';
import { rootURL } from '../../src/utils/utils';
jest.mock('axios');
// Mock useNavigate

const jsonURL = rootURL;

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
});

describe("Register Functionality Tests", () => {

  test("submits form with valid data", async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(<BrowserRouter><Register /></BrowserRouter>);
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Pick a Username/i), { target: { value: '@validuser' } });
      fireEvent.change(screen.getByLabelText(/Pick a Password/i), { target: { value: 'validPass#1' } });
      fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    });
    await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(`${jsonURL}/register`, expect.any(String));
    });
  });

  test("handles 'user already exists' response", async () => {
    const errorMessage = "User already exists";
    axios.post.mockRejectedValue({ response: { data: { error: errorMessage } } });

    render(<BrowserRouter><Register /></BrowserRouter>);
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Pick a Username/i), { target: { value: '@existinguser' } });
      fireEvent.change(screen.getByLabelText(/Pick a Password/i), { target: { value: 'pass#1234' } });
      fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    });

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  test("shows tooltips on input focus", async () => {
    render(<BrowserRouter><Register /></BrowserRouter>);
    fireEvent.focus(screen.getByLabelText(/Pick a Username/i));
    fireEvent.focus(screen.getByLabelText(/Pick a Password/i));
  
    const messages = await screen.findAllByText(/Minimum length of 5 characters/i);
    expect(messages.length).toBe(2);
  });

  test("handles server validation errors", async () => {
    const validationError = "Username cannot start with a letter.";
    axios.post.mockRejectedValue({ response: { data: { error: validationError } } });
  
    render(<BrowserRouter><Register /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText(/Pick a Username/i), { target: { value: 'user' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
  
    expect(await screen.findByText(validationError)).toBeInTheDocument();
  });

  test("handles other server-side errors", async () => {
    const serverError = "Server error occurred";
    axios.post.mockRejectedValue({ response: { data: { error: serverError } } });
  
    render(<BrowserRouter><Register /></BrowserRouter>);
    fireEvent.change(screen.getByLabelText(/Pick a Username/i), { target: { value: 'user' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
  
    expect(await screen.findByText(serverError)).toBeInTheDocument();
  });
  
  test("username tooltip is visible on focus and hidden on blur", async () => {
    render(<BrowserRouter><Register /></BrowserRouter>);
    const usernameInput = screen.getByLabelText(/Pick a Username/i);
  
    fireEvent.focus(usernameInput);
    expect(await screen.findByText(/Minimum length of 5 characters/i)).toBeInTheDocument();
  
    fireEvent.blur(usernameInput);
    await waitFor(() => {
      expect(screen.queryByText(/Minimum length of 5 characters/i)).not.toBeInTheDocument();
    });
  });

  test("all UI components are consistently rendered", () => {
    const { asFragment } = render(<BrowserRouter><Register /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
  });
});