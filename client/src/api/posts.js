import axios from 'axios';
import { rootURL, serverPort } from "../utils/utils";

/**
 * This module contains HTTP calls to the userpost to the backend
 */
const jsonURL = `${rootURL}:${serverPort}`

export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${jsonURL}/posts`);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const getPostById = async (id) =>{
    try {
        const response = await axios.get(`${jsonURL}/posts/${id}`);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const getPostsByUser = async (username) => {
    try {
        const response = await axios.get(`${jsonURL}/posts?user=${username}`);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`${jsonURL}/posts/${id}`);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const addCommentToPost = async (id, existingComments, newComment) => {
    try {
        existingComments.push(newComment);
        console.log('addCommentToPost', existingComments);
        const response = await axios.put(`${jsonURL}/posts/${id}`, {comments: existingComments});
        return response;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const createPost = async (post) => {
    try {
        const response = await axios.post(`${jsonURL}/posts`, post);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const editPostById = async (id, post) => {
    console.log('editPostById, new post:', post);
    try {
        const response = await axios.put(`${jsonURL}/posts/${id}`, post);
        console.log('editPostById', response.data.value);
        return response.data.value;
    } catch (err) {
        console.error('error', err.message);
    }
}