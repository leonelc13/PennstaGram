/*eslint-disable*/
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

    test ("renders with comments", async () => {
        await act( async () => render(<BrowserRouter><PostDetails /></BrowserRouter>));
        waitFor(() => expect(screen.queryByTestId('comments')).toBeInTheDocument());
    });
    

});

// import React from 'react';
// import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
// import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom';
// import axios from 'axios'; // Mocked axios instance
// import PostDetails from "../../src/components/Post/PostDetails";
// import * as posts from '../../src/api/posts';
// import * as users from '../../src/api/users';

// jest.mock('../../src/api/posts');
// jest.mock('../../src/api/users');

// const mockPost = {
//   _id: '123',
//   content: 'Test post content',
//   user: 'testUser',
//   // ... other fields
// };

// const mockUser = {
//   username: 'testUser',
//   // ... other fields
// };

// describe('PostDetails component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should render post details', async () => {
//     users.getUserById.mockResolvedValueOnce(mockUser);
//     posts.getPostById.mockResolvedValueOnce(mockPost);
    
//     await act(async () => render(<MemoryRouter initialEntries={['/posts/123']}><Routes><Route path="/posts/:id" element={<PostDetails currentUsername="testUser" />} /></Routes></MemoryRouter>));

//     // Wait for the component to load and render
//     await waitFor(() => {
//       // Assert that the component renders correctly
//       expect(screen.getByText('Test post content')).toBeInTheDocument();
//       expect(screen.getByText('testUser')).toBeInTheDocument();
//     });
//   });

//   it('should render post details', async () => {
//     await act(async () => render(
//       <BrowserRouter>
//         <Routes>
//           <Route path="/posts/:id" element={<PostDetails currentUsername="testUser" />} />
//         </Routes>
//       </BrowserRouter>,
//     ));
//     screen.debug();

//     // Wait for the component to load and render
//     await waitFor(() => {
//       expect(screen.getByTestId('postPreview')).toBeInTheDocument();
//       expect(screen.getByTestId('deleteButton')).toBeInTheDocument();
//     });
//   });


//   test('deletes post when "Delete Post" button is clicked', async () => {
//     render(
//       <BrowserRouter>
//         <Routes>
//           <Route path="/posts/:id" element={<PostDetails currentUsername="testUser" />} />
//         </Routes>
//       </BrowserRouter>,
//     );

//     // Wait for the "Delete Post" button to be present
//     waitFor(() => {
//         expect(screen.getByRole('button', { name: /Delete Post/i })).toBeInTheDocument();
//     });
//     screen.debug();
//     // Click the "Delete Post" button
//     fireEvent.click(screen.getByText('Delete Post'));


//     // Ensure that the deletePost request is made
//     await waitFor(() => {
//       expect(axios.delete).toHaveBeenCalledWith('/api/posts/123');
//     });

//     // Ensure that the user is navigated to the home page after deletion
//     expect(window.location.pathname).toBe('/');
//   });
// });

