/*eslint-disable*/
import React from 'react';
import { expect, test } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, act, waitFor} from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import FollowButton from '../../src/components/UserProfile/Follow';

// checks if the follow button is rendered correctly

test("renders correctly", async() => {
    const tree = renderer.create(<BrowserRouter><FollowButton /></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('follow button', async () => {
    render(<BrowserRouter><FollowButton isFollowing = {false}/></BrowserRouter>);
    const follow = screen.getByRole('button', { name: /Follow/i });

    await act(async () => {
      fireEvent.click(follow);
    })
    
    waitFor(() => expect(screen.queryByTestId('unfollowButton')).toBeInTheDocument());
});

test('unfollow button', async () => {
    render(<BrowserRouter><FollowButton isFollowing={true} /></BrowserRouter>);
    const follow = screen.getByRole('button', { name: /unFollow/i });

    await act(async () => {
        fireEvent.click(follow);
    })

    waitFor(() => expect(screen.queryByTestId('followButton')).toBeInTheDocument());
});
