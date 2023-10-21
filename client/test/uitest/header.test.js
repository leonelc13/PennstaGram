import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../src/components/Header/header';  // Adjust path accordingly

describe('<Header />', () => {
  
  const mockHandleLogout = jest.fn();
  const mockProps = {
    handleLogout: mockHandleLogout,
    user_profile_picture: 'test.jpg',
  };

  test('renders links and elements', () => {
    const { getByText, getByPlaceholderText } = render(
      <Router>
        <Header {...mockProps} />
      </Router>
    );

    // Check for rendered elements and links
    expect(screen.getByText('PennConnect')).toBeInTheDocument();
    expect(screen.getByText('Main Activity')).toBeInTheDocument();
    expect(screen.getByText('Chats')).toBeInTheDocument();
    expect(screen.getByText('Create Post')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for Friends, Quizzes, and more')).toBeInTheDocument();
  });

  test('renders user profile picture', () => {
    //const { getByAltText } = 
    render(
      <Router>
        <Header {...mockProps} />
      </Router>
    );

    const img = screen.getByAltText(' profile-pic');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  test('calls handleLogout on logout button click', () => {
    //const { getByText } = 
    render(
      <Router>
        <Header {...mockProps} />
      </Router>
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
  });

});
