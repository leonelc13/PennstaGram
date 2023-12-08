const jwt = require('jsonwebtoken');
const { getUser } = require('../model/Login-RegisterDBOperations');

require('dotenv').config();

// eslint-disable-next-line consistent-return
const authenticateUser = (userid) => {
  try {
    const token = jwt.sign({ username: userid }, process.env.KEY, { expiresIn: '120s' });
    return token;
  } catch (err) { /* empty */ }
};

const verifyUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const user = await getUser(decoded.username);
    if (!user) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { authenticateUser, verifyUser };
