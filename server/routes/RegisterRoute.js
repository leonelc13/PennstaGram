const { authenticateUser } = require('../utils/auth');
const { getUser, registerUser } = require('../model/Login-RegisterDBOperations');
const { unknownProfilePhoto } = require('../utils/utils');

const RegisterRoute = async function (req, res) {
  // console.log('Registering new user');
  const { name, password } = req.body;

  if ((name === '') && (password === '')) {
    res.status(401).json({ error: 'Missing username and password' });
    return;
  } if (!name || name === '') {
    res.status(401).json({ error: 'Missing username' });
    return;
  } if (!password || password === '') {
    res.status(401).json({ error: 'Missing password' });
    return;
  }

  const user = await getUser(name);

  if (user) {
    // console.log('Register user check for already exists', user);
    res.status(401).json({ error: 'User already exists' });
    return;
  }

  try {
    const newUser = {
      username: name,
      password,
      profile: unknownProfilePhoto,
      followers: [],
      following: [],
    };

    await registerUser(newUser);

    try {
      const token = authenticateUser(name);
      const response = {
        apptoken: token,
        username: name,
        profile_picture: unknownProfilePhoto,
      };
      res.status(201).send(response);
    } catch (err) {
      // console.log('Error in authentication', err);
      res.status(401).json({ error: `${err.message}` });
    }
  } catch (err) {
    // console.log('Error in registration', err);
    res.status(401).json({ message: err.message });
  }
};

module.exports = RegisterRoute;
