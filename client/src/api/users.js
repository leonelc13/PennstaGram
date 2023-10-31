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
        if (current.following === null && target.followers === null) {  
            current.following.push(targetUser);
            target.followers.push(currentUser);
        } else{
            if (!current.following.includes(targetUser)) {
                current.following.push(targetUser);
                target.followers.push(currentUser);
            }
        }
        await updateUser(target);
        const response = await updateUser(current);
        return response.data;
    } catch (err) {
        console.error('error', err.message);
    }
}

export const unfollowUser = async (currentUser, targetUser) => {
    try {
        let current = await getUserById(currentUser);
        let target = await getUserById(targetUser);
        const currentFollowing = current.following;

        var index = currentFollowing.indexOf(targetUser);
        if (index > -1) {
            current.following.splice(index, 1);
        }
        const follower_index = target.followers.indexOf(currentUser);
        if (follower_index > -1) {
            target.followers.splice(follower_index, 1);
        }
        await updateUser(target);
        const response = await updateUser(current);
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

export const tryLogin = async (username, password, setErrorMessage, handleLogin ) => {
    try {
        if (!username && !password) {
            setErrorMessage('Please enter both a username and password');
            return;
          }
        
        if (!username) {
            setErrorMessage('Please enter a username');
            return;
        }
        
        if (!password) {
            setErrorMessage('Please enter a password');
            return;
        }
        
        const response = await axios.post(`${rootURL}:3000/login`, `name=${username}&password=${password}`);
        handleLogin(response);
    } catch (err) {
        const errorMessage = err.response?.data?.error === null ? err.response?.data?.error : err.message;
        setErrorMessage(errorMessage);
        console.log('error', err.message);
    }


    /**try {
        const response = await axios.get(`${rootURL}:3000/users`, {
            params: {
                username: username,
                password: password
            } 
        });

        const data = response.data;
        if (data.length === 0 || data[0].password !== password || data[0].username !== username) {
            setErrorMessage("Sorry, we don't recognize that combination of username and password. Please try again");
            return;
        }

        const token = Math.random().toString(36).substring(7); // simple token generation

        // Now, you'd want to save this token in your db.json
        await axios.patch(`${rootURL}:3000/users/${data[0].id}`, {
            token: token
        });

        // Save token in local storage or cookie
        localStorage.setItem('userToken', token);
        
        handleLogin(data[0]);

    } catch (err) {
        console.log('error', err.message);
    }*/
}

export const tryRegister = async (username, password, setErrorMessage, navigate) => {
    try {
        if (!username && !password) {
            setErrorMessage('Please enter both a username and password');
            return;
          }
        
        if (!username) {
            setErrorMessage('Please enter a username');
            return;
        }
        
        if (!password) {
            setErrorMessage('Please enter a password');
            return;
        }

        console.log(username);
        console.log(password);
        const response = await axios.post(`${rootURL}:3000/register`, `name=${username}&password=${password}`);
        if (response.data.error !== null) {
            setErrorMessage(response.data.error);
        }
        else {
            navigate('/login');
        }
    } catch (err) {
        const errorMessage = err.response?.data?.error === null ? err.response?.data?.error : err.message;
        setErrorMessage(errorMessage);
        console.log('error', errorMessage);
    }
}

export const getUserByToken = async (token, setUser, setAuthenticated, setLoading) => {
    if(token){
        axios.get(`${rootURL}:3000/users`, {
            params: { token: token }
        }).then(response => {
            if(response.data.length > 0) {
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
}
