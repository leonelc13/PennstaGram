const { authenticateUser } = require('../utils/auth');
const { getUser, updateUserLoginAttempts } = require('../model/Login-RegisterDBOperations');

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

  if (user.lockUntil && user.lockUntil > new Date()) {
    return res.status(401).json({ error: 'Account is locked for 2 minutes' });
  }

  const isPasswordMatch = password === user.password;

  if (!isPasswordMatch) {
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;

    if (user.failedLoginAttempts >= 3) {
      user.lockUntil = new Date(Date.now() + 2 * 60 * 1000); // Lock account for 10 minutes
      user.failedLoginAttempts = 0; // Reset attempts
    }

    await updateUserLoginAttempts(name, user.failedLoginAttempts, user.lockUntil);
    return res.status(401).json({ error: 'Password does not match our records' });
  }

  await updateUserLoginAttempts(name, 0, null);

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
