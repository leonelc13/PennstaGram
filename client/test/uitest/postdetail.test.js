import React from 'react';
import { describe,test, expect, jest } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import PostDetails from "../../src/components/Post/PostDetails";

jest.mock('axios');

const mockPosts = [{
    id: 1,
    title: "testPost",
    content: "testContent",
    url: "https://i.ibb.co/60NBw0q/tiger.jpg",
    isImage: true,
    user: "Sunny",
    created: "2017-11-28T20:00:00.000Z",
    likes: 0,
    comments: [
        {
          "id": 1,
          "content": "testComment",
          "user": "Sunny",
          "created": "2017-11-28T20:00:00.000Z"
        }
      ]
}]

jest.mock('axios', () => ({
    get: () => Promise.resolve({ data: mockPosts }),
}));

describe("Post Detail", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<BrowserRouter><PostDetails /></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("renders with post preview", async () => {
        await act( async () => render(<BrowserRouter><PostDetails /></BrowserRouter>));
        waitFor(() => expect(screen.queryByTestId('postPreview')).toBeInTheDocument());
    });    

});
