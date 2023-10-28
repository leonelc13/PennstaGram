import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, jest } from '@jest/globals';
import { render, screen, waitFor} from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import User from "../../src/components/UserProfile/user";

const mockUser = {
  username: 'testuser',
  userid: 'testuser',
  bio: 'Bio',
  followers: ['Alice'],
  following: ['Sunny']
}

jest.mock('axios', () => ({
  get: () => Promise.resolve({ data: mockUser }),
}));

//test for user profile page
describe("User component", () => {
    
    test("renders correctly", () => {
        const tree = renderer.create(<BrowserRouter><User /></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
      });

    render(<BrowserRouter><User /></BrowserRouter>);
    test("renders with div id of userpost", async () => {
      waitFor(() => expect(screen.queryByTestId('userPostComponent')).toBeInTheDocument());
    });

});