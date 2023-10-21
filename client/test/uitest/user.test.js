import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import User from "../../src/components/UserProfile/user";
import axios from 'axios';
jest.mock('axios');

//test for user profile page
