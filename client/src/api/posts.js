import axios from 'axios';
import { rootURL } from '../utils/utils';

/**
 * This module contains HTTP calls to the userpost to the backend
 */
const jsonURL = `${rootURL}`;

const setHeaders = () => {
  axios.defaults.headers.common.Authorization = (localStorage.getItem('app-token') !== null) ? localStorage.getItem('app-token') : null;
};

const reAuthenticate = (status) => {
  if (status === 401) {
    localStorage.removeItem('app-token');
    window.location.reload(true);
  }
};

export const getAllPosts = async (page, limit = 5) => {
  try {
    setHeaders();
    const response = await axios.get(`${jsonURL}/posts`, { params: { page, limit } });
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const getAllPostIds = async () => {
  try {
    setHeaders();
    const response = await axios.get(`${jsonURL}/postIds`);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const getFeed = async (username, page, limit = 5) => {
  try {
    setHeaders();
    const response = await axios.get(`${jsonURL}/feed/${username}`, { params: { page, limit } });
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const getPostById = async (id) => {
  try {
    setHeaders();
    const response = await axios.get(`${jsonURL}/posts/${id}`);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const getHiddenPostByUser = async (username) => {
  try {
    setHeaders();
    const response = await axios.get(`${jsonURL}/posts/hidden/${username}`);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const getPostsByUser = async (username) => {
  try {
    setHeaders();
    const response = await axios.get(`${jsonURL}/posts/byUser/${username}`);
    return response.data;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const deletePost = async (id) => {
  try {
    setHeaders();
    const response = await axios.delete(`${jsonURL}/posts/${id}`);
    reAuthenticate(response.status);
    return response.data;
  } catch (err) {
    reAuthenticate(401);
    // console.error('error', err.message);
    // reAuthenticate(401);
    return err.message;
  }
};

export const addCommentToPost = async (id, existingComments, newComment) => {
  try {
    setHeaders();
    existingComments.push(newComment);
    // console.log('addCommentToPost', existingComments);
    const response = await axios.put(`${jsonURL}/posts/${id}`, { comments: existingComments });
    return response;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const s3Upload = async (file) => {
  try {
    const response = await axios.post(`${jsonURL}/s3Upload`, file);
    return response.data;
  } catch (err) {
    // console.error('error', err);
    const errorMessage = err.response?.data?.error ? err.response.data.error : err.message;
    return { error: errorMessage };
  }
};

export const createPost = async (post) => {
  try {
    setHeaders();
    const response = await axios.post(`${jsonURL}/posts`, post);
    return response.data;
  } catch (err) {
    // console.error('error', err);
    const errorMessage = err.response?.data?.error ? err.response.data.error : err.message;
    return { error: errorMessage };
  }
};

export const editPostById = async (id, post) => {
  try {
    setHeaders();
    const response = await axios.put(`${jsonURL}/posts/${id}`, post);
    return response.data.value;
  } catch (err) {
    // console.error('error', err.message);
    return err.message;
  }
};

export const updatePostLikesAndLikedBy = async (id, likesCount, usersLiked) => {
  try {
    setHeaders();
    const response = await axios.put(`${jsonURL}/posts/${id}`, {
      likes: likesCount,
      likedBy: usersLiked,
    });
    return response.data;
  } catch (err) {
    return err.message;
  }
};
