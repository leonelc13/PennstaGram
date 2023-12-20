/*eslint-disable*/
import axios from 'axios';
import { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    checkFolloing,
    getUserByToken,
    tryRegister,
    tryLogin,
    jsonURL,
} from '../../src/api/users';

// Mock the axios module
jest.mock('axios');

describe('getAllUsers', () => {
  test('should fetch all users successfully', async () => {
    const responseData = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];

    // Mock the axios.get function
    axios.get.mockResolvedValue({ data: responseData });

    // Call the function
    const result = await getAllUsers();

    // Assertions
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/users'));
    expect(result).toEqual(responseData);
  });

  test('should handle fetch all users failure', async () => {
    const errorMessage = 'Failed to fetch users';

    // Mock the axios.get function to simulate an error
    axios.get.mockRejectedValue({ message: errorMessage });

    // Call the function
    const result = await getAllUsers();

    // Assertions
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/users'));
    expect(result).toEqual(errorMessage);
  });
});

describe('getUserById', () => {
  test('should fetch user by ID successfully', async () => {
    const userId = 123;
    const responseData = { id: userId, username: 'user123' };

    // Mock the axios.get function
    axios.get.mockResolvedValue({ data: responseData });

    // Call the function
    const result = await getUserById(userId);

    // Assertions
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/users/${userId}`));
    expect(result).toEqual(responseData);
  });

  test('should handle fetch user by ID failure', async () => {
    const userId = 123;
    const errorMessage = 'Failed to fetch user';

    // Mock the axios.get function to simulate an error
    axios.get.mockRejectedValue({ message: errorMessage });

    // Call the function
    const result = await getUserById(userId);

    // Assertions
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/users/${userId}`));
    expect(result).toEqual(errorMessage);
  });
});

describe('updateUser', () => {
    test('should update user successfully', async () => {
      const user = {
        _id: 123,
        username: 'updatedUser',
        email: 'updatedUser@example.com',
        followers: [],
        following: [],
      };
      const responseData = { id: user._id, username: user.username, email: user.email };
  
      // Mock the axios.put function
      axios.put.mockResolvedValue({ data: responseData });
  
      // Call the function
      const result = await updateUser(user);
  
      // Assertions
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining(`/users/${user._id}`),
        user
      );
      expect(result).toEqual(responseData);
    });
  
    test('should handle update user failure', async () => {
      const user = {
        _id: 123,
        username: 'updatedUser',
        email: 'updatedUser@example.com',
        followers: [],
        following: [],
      };
      const errorMessage = 'Failed to update user';
  
      // Mock the axios.put function to simulate an error
      axios.put.mockRejectedValue({ message: errorMessage });
  
      // Call the function
      const result = await updateUser(user);
  
      // Assertions
      expect(axios.put).toHaveBeenCalledWith(
        expect.stringContaining(`/users/${user._id}`),
        user
      );
      expect(result).toEqual(errorMessage);
    });
});

describe('checkFollowing', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods of the mock
        jest.clearAllMocks();
      });

    it('should return true if u1 is following u2', async () => {
        const u1 = { _id: 'user1', following: ['user2'] };
        const u2 = { _id: 'user2' };
    
        axios.get.mockResolvedValueOnce({ data: u1 }).mockResolvedValueOnce({ data: u2 });
    
        const result = await checkFolloing(u1._id, u2._id);
    
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/users/${u1._id}`));
        expect(result).toBe(true);
      });
  
  
      test('should handle checkFollowing failure', async () => {
        const u1 = { _id: 'user1' };
        const u2 = { _id: 'user2' };
        const errorMessage = 'Failed to check following';
      
        axios.get
          .mockResolvedValueOnce({ data: u1 })
          .mockRejectedValueOnce({ message: errorMessage });
      
        const result = await checkFolloing(u1._id, u2._id); // Corrected function name
      
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining(`/users/${u1._id}`));
      });
  });

  
describe('tryRegister function', () => {
    test('should handle successful registration', async () => {
      const mockUsername = 'testuser';
      const mockPassword = 'testpassword';
      const mockSetErrorMessage = jest.fn();
      const mockNavigate = jest.fn();
  
      axios.post.mockResolvedValueOnce({ data: {} });
  
      await tryRegister(mockUsername, mockPassword, mockSetErrorMessage, mockNavigate);
  
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/register'),
        `name=${mockUsername}&password=${mockPassword}`
      );
  
      expect(mockSetErrorMessage).not.toHaveBeenCalled(); // No error message should be set
      expect(mockNavigate).toHaveBeenCalledWith('/login'); // Should navigate to '/login'
    });
  
    test('should handle registration error', async () => {
      const mockUsername = 'testuser';
      const mockPassword = 'testpassword';
      const mockSetErrorMessage = jest.fn();
      const mockNavigate = jest.fn();
  
      const errorMessage = 'Username already exists';
  
      axios.post.mockRejectedValueOnce({ response: { data: { error: errorMessage } } });
  
      await tryRegister(mockUsername, mockPassword, mockSetErrorMessage, mockNavigate);
  
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/register'),
        `name=${mockUsername}&password=${mockPassword}`
      );
  
      expect(mockSetErrorMessage).toHaveBeenCalledWith(errorMessage);
      expect(mockNavigate).not.toHaveBeenCalled(); // Should not navigate on registration error
    });
  
    test('should handle registration failure', async () => {
      const mockUsername = 'testuser';
      const mockPassword = 'testpassword';
      const mockSetErrorMessage = jest.fn();
      const mockNavigate = jest.fn();
  
      axios.post.mockRejectedValueOnce(new Error('Network error'));
  
      await tryRegister(mockUsername, mockPassword, mockSetErrorMessage, mockNavigate);
  
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/register'),
        `name=${mockUsername}&password=${mockPassword}`
      );
  
      expect(mockSetErrorMessage).toHaveBeenCalledWith(
        'An error occurred. Please try again.'
      );
      expect(mockNavigate).not.toHaveBeenCalled(); // Should not navigate on registration failure
    });
  });


describe('tryLogin function', () => {
    test('should handle successful login', async () => {
      const username = 'testUser';
      const password = 'testPassword';
      const mockResponse = { data: { /* response data for successful login */ } };
  
      // Mocking the axios.post function
      axios.post.mockResolvedValueOnce(mockResponse);
  
      const setErrorMessage = jest.fn();
      const handleLogin = jest.fn();
  
      await tryLogin(username, password, setErrorMessage, handleLogin);
  
      // Assertions
      expect(axios.post).toHaveBeenCalledWith(`${jsonURL}/login`, `name=${username}&password=${password}`);
      expect(handleLogin).toHaveBeenCalledWith(mockResponse);
      expect(setErrorMessage).not.toHaveBeenCalled();
    });
  
    test('should handle login failure', async () => {
      const username = 'testUser';
      const password = 'testPassword';
      const errorMessage = 'Login failed';
  
      // Mocking the axios.post function to simulate an error
      axios.post.mockRejectedValueOnce({ response: { data: { error: errorMessage } } });
  
      const setErrorMessage = jest.fn();
      const handleLogin = jest.fn();
  
      await tryLogin(username, password, setErrorMessage, handleLogin);
  
      // Assertions
      expect(axios.post).toHaveBeenCalledWith(`${jsonURL}/login`, `name=${username}&password=${password}`);
      expect(handleLogin).not.toHaveBeenCalled();
      expect(setErrorMessage).toHaveBeenCalledWith(errorMessage);
    });
  });