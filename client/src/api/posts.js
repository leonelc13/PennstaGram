import axios from 'axios';
import { rootURL } from "../utils/utils";

/**
 * This module contains HTTP calls to the userpost to the backend
 */
const jsonURL = `${rootURL}:3000`

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