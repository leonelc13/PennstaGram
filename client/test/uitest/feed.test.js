import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import ActivityFeed from '../../src/components/ActivityFeed/ActivityFeed';


const mockPosts = [{
    id: 1,
    title: "testPost",
    content: "testContent",
    url: "https://i.ibb.co/60NBw0q/tiger.jpg",
    isImage: true,
    user: "Sunny",
    created: "2017-11-28T20:00:00.000Z",
    likes: 0,
    comments: []
}]

jest.mock('axios', () => ({
    get: () => Promise.resolve({ data: mockPosts }),
}));

// test for user profile page
describe('Test Activity Feed', () => {
    it('should display', async () => {
        await act( async () => render(<BrowserRouter> <ActivityFeed /> </BrowserRouter>));
        waitFor(() => expect(screen.queryByTestId('feedComponent')).toBeInTheDocument());
  });
});