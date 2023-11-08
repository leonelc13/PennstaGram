import { useState, useCallback } from 'react';

export const useUserAuth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = useCallback((event, authAction) => {
        event.preventDefault();
        authAction(username, password, setErrorMessage);
    }, [username, password]);

    return {
        username,
        password,
        errorMessage,
        setUsername,
        setPassword,
        setErrorMessage,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit,
    };
};