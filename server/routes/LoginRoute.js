const { authenticateUser } = require('../utils/auth');
const { getUser } = require('../model/Login-RegisterDBOperations');

const LoginRoute = async (req, res) => {
  const { name, password } = req.body;

  if ((name === '') && (password === '')) {
    res.status(401).json({ error: 'Missing username and password' });
    return {};
  }

  if (!name || name === '') {
    res.status(401).json({ error: 'Missing username' });
    return {};
  } if (!password || password === '') {
    res.status(401).json({ error: 'Missing password' });
    return {};
  }

  const user = await getUser(name);
  // console.log("in server login is returning this user", user);

  if (!user) {
    res.status(401).json({ error: 'User does not exist' });
    return {};
  }

  const isPasswordMatch = password === user.password;

  if (!isPasswordMatch) {
    res.status(401).json({ error: 'Password does not match our records' });
    return {};
  }

  try {
    const token = authenticateUser(name);
    const response = {
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      username: user.username,
      profile_picture: user.profile_img,
      apptoken: token,
      followers: user.followers,
      following: user.following,
    };
    return res.status(201).send(response);
  } catch (err) {
    return res.status(401).send({ error: `${err.message}` });
  }
};

module.exports = LoginRoute;
