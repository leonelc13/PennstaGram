import axios from 'axios';
import { rootURL } from '../utils/utils';

/**
 * This module contains HTTP calls to the User information to the backend
 */

const jsonURL = `${rootURL}`;
const setHeaders = () => {
  axios.defaults.headers.common.Authorization = localStorage.getItem('app-token');
};

/** const reAuthenticate = (status) => {
  if (status === 401) {
    localStorage.removeItem('app-token');
    window.location.reload(true);
  }
}; */

export const getAllUsers = async () => {
  try {
    setHeaders();
    const response = await axios.get(`${jsonURL}/users`);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const getUserById = async (id) => {
  try {
    setHeaders();
    const response = await axios.get(`${jsonURL}/users/${id}`);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const createUser = async (user) => {
  try {
    setHeaders();
    const response = await axios.post(
      `${jsonURL}/users`,
      `id=${user.username}&username=${user.username}&password=${user.password}&email=${user.email}&followers=${[]}&following=${[]}`,
    ); // may need to add more fields
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const updateUser = async (user) => {
  try {
    setHeaders();
    // console.log('updateUser', typeof(user._id));
    // eslint-disable-next-line no-underscore-dangle
    const response = await axios.put(`${jsonURL}/users/${user._id}`, user);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const addHiddenPost = async (user, postId) => {
  try {
    setHeaders();
    const currentUser = await getUserById(user);
    // if this current post is not in user.hiddenPosts, or it is null, add it
    if (currentUser.hiddenPosts === null || !currentUser.hiddenPosts.includes(postId)) {
      currentUser.hiddenPosts.push(postId);
    }
    const response = await updateUser(currentUser);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const removeHiddenPost = async (user, postId) => {
  try {
    setHeaders();
    const currentUser = await getUserById(user);
    // if this current post is in user.hiddenPosts, remove it
    if (currentUser.hiddenPosts !== null && currentUser.hiddenPosts.includes(postId)) {
      const index = currentUser.hiddenPosts.indexOf(postId);
      if (index > -1) {
        currentUser.hiddenPosts.splice(index, 1);
      }
    }
    const response = await updateUser(currentUser);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const followUser = async (currentUser, targetUser) => {
  try {
    setHeaders();
    const current = await getUserById(currentUser);
    const target = await getUserById(targetUser);
    if (current.following === null && target.followers === null) {
      current.following.push(targetUser);
      target.followers.push(currentUser);
    } else if (!current.following.includes(targetUser)) {
      current.following.push(targetUser);
      target.followers.push(currentUser);
    }
    await updateUser(target);
    const response = await updateUser(current);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const unfollowUser = async (currentUser, targetUser) => {
  try {
    setHeaders();
    const current = await getUserById(currentUser);
    const target = await getUserById(targetUser);
    const currentFollowing = current.following;

    const index = currentFollowing.indexOf(targetUser);
    if (index > -1) {
      current.following.splice(index, 1);
    }
    const followerIndex = target.followers.indexOf(currentUser);
    if (followerIndex > -1) {
      target.followers.splice(followerIndex, 1);
    }
    await updateUser(target);
    const response = await updateUser(current);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

// checks if u1 is following u2, returns a boolean
export const checkFolloing = async (u1, u2) => {
  try {
    setHeaders();
    const current = await getUserById(u1);
    if (current.following === null) {
      return false;
    }
    return current.following.includes(u2);
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const tryLogin = async (username, password, setErrorMessage, handleLogin) => {
  try {
    const response = await axios.post(`${jsonURL}/login`, `name=${username}&password=${password}`);
    handleLogin(response);
  } catch (err) {
    const errorMessage = err.response?.data?.error || 'An error occurred. Please try again.';
    setErrorMessage(errorMessage);
    // console.log('error', errorMessage);
  }
};

export const tryRegister = async (username, password, setErrorMessage, navigate) => {
  try {
    const response = await axios.post(`${jsonURL}/register`, `name=${username}&password=${password}`);
    if (response.data.error !== undefined) {
      // console.log('Error in tryRegister response', response.data);
      setErrorMessage(response.data.error);
    } else {
      navigate('/login');
    }
  } catch (err) {
    const errorMessage = err.response?.data?.error || 'An error occurred. Please try again.';
    setErrorMessage(errorMessage);
    // console.log('error', errorMessage);
  }
};

export const getUserByToken = async (token, setUser, setAuthenticated, setLoading) => {
  if (token) {
    axios.get(`${rootURL}:3000/users`, {
      params: { token },
    }).then((response) => {
      if (response.data.length > 0) {
        setUser(response.data[0]);
        // setUsername(response.data[0].username);
        // setUserId(response.data[0].id);
        setAuthenticated(true);
      }
      setLoading(false);
    });
  } else {
    setLoading(false);
  }
};
