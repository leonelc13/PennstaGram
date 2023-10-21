import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import PostDetails from "../../src/components/Post/PostDetails";
import axios from 'axios';
jest.mock('axios');

describe("Post List", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<BrowserRouter><PostDetails /></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });

});
