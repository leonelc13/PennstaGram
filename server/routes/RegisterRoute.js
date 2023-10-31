const { authenticateUser } = require('../utils/auth');
const { getUser, registerUser } = require('../model/Login-RegisterDBOperations');

const RegisterRoute = async function(req, res) {
    const { name, password } = req.body;

    if ((name === '') && (password === '')) {
        res.status(401).json({error: 'Missing username and password'});
        return;
    } else if (!name || name === '') {
        res.status(401).json({error: 'Missing username'});
        return;
    } else if (!password || password === '') {
        res.status(401).json({error: 'Missing password'});
        return;
    }

    const user = await getUser(name);
    
    if (user) {
        res.status(401).json({error: 'User already exists'});
        return;
    }

    try {
        const newUser = {
            username: name,
            password: password
        }

        await registerUser(newUser);

        try {
            const token = authenticateUser(name);
            const response = {
                apptoken: token,
                username: name,
                profile_picture: ''
            }
            res.status(201).send(response);
        } catch (err) {
            res.status(401).json({error: `${err.message}`});
        }

    } catch(err) {
        res.status(401).json({message: 'There was an error registering this user'});
    }

}

module.exports = RegisterRoute;