const jwt = require('jsonwebtoken');
const { getUser } = require('../model/Login-RegisterDBOperations');
const { databaseKey } = require('./utils');

require('dotenv').config();

const authenticateUser = (userid) => {

    try {
        const token = jwt.sign({username: userid}, databaseKey, {expiresIn: '120s'});
        console.log('token', token);
        return token;
    } catch (err) {
        console.log('error', err.message);
    }
};

const verifyUser = async (token) => {
    try {
        const decoded = jwt.verify(token, databaseKey);
        console.log('payload', decoded);
        const user = await getUser(decoded.username);
        if (!user) {
            return false;
        }
        return true;
    } catch (err) {
        console.log('error', err.message);
        return false;
    }
}

module.exports = { authenticateUser, verifyUser };
