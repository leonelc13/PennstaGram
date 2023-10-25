import axios from 'axios';
import { rootURL } from "../utils/utils";

/**
 * This module contains HTTP calls to the User information to the backend
 */

const jsonURL = `${rootURL}:3000`

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${jsonURL}/users`);
        return response.data;
    } catch (err) {
        console.error('error', err.message);}

}

export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${jsonURL}/users/${id}`);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const createUser = async (user) => {
    try {
        const response = await axios.post(`${jsonURL}/users`, 
        `id=${user.username}&username=${user.username}&password=${user.password}&email=${user.email}&followers=${[]}&following=${[]}`); //may need to add more fields
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const updateUser = async (user) => {
    try {
        const response = await axios.put(`${jsonURL}/users/${user.id}`, user);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}


export const followUser = async (currentUser, targetUser) => {
    try {
        const current = await getUserById(currentUser);
        const target = await getUserById(targetUser);
        current.following.push(targetUser);
        target.followers.push(currentUser);
        updateUser(target);
        const response = updateUser(current);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const unfollowUser = async (currentUser, targetUser) => {
    try {
        let current = await getUserById(currentUser);
        let target = await getUserById(targetUser);
        console.log("current: " + currentUser);
        console.log("target: " + targetUser);
        const currentFollowing = current.following;

        var index = currentFollowing.indexOf(targetUser);
        if (index > -1) {
            current.following.splice(index, 1);
        }
        const follower_index = target.followers.indexOf(currentUser);
        if (follower_index > -1) {
            target.followers.splice(follower_index, 1);
        }
        updateUser(target);
        const response = updateUser(current);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

// checks if u1 is following u2, returns a boolean
export const checkFolloing = async (u1, u2) => {
    try {
        const current = await getUserById(u1);
        if (current.following === null) {
            return false;
        } else {
            return current.following.includes(u2);
        }
    } catch (err) {
        console.error('error', err.message);
    }
}
