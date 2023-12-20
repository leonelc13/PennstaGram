/*eslint-disable*/
import React from 'react';
import { expect, test } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import CommentList from '../../src/components/Post/CommentList';
import axios from 'axios';


jest.mock('axios');

const mockComments = [
        {
          "id": 1,
          "content": "testComment",
          "user": "Sunny",
          "created": "2017-11-28T20:00:00.000Z"
        }
    ]

jest.mock('axios', () => ({
    get: () => Promise.resolve({ data: mockComments }),
}));

describe("Comment List", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<BrowserRouter><CommentList /></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("renders with comment list", async () => {
        const container =  await act( async () => render(<BrowserRouter><CommentList comments={mockComments} /></BrowserRouter>));
        waitFor(() => expect(screen.queryByTestId('postPreview')).toBeInTheDocument());
    });

});