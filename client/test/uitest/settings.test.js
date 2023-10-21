import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Settings from "../../src/components/UserProfile/setting";
import axios from 'axios';
jest.mock('axios');

//test for user profile page
describe("User Setting Page", () => {
    test("renders correctly", () => {
        const tree = renderer.create(<BrowserRouter><Settings /></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });

});