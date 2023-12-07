const { getUser, registerUser } = require('../model/Login-RegisterDBOperations');
const { unknownProfilePhoto } = require('../utils/utils');

const RegisterRoute = async (req, res) => {
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

  const validateCredentials = () => {
    const errors = [];

    if (name.length < 5 || name.length > 10) {
      errors.push('Username must be between 5 and 10 characters.');
    }
    if (!/^[^a-zA-Z]/.test(name)) {
      errors.push('Username cannot start with a letter.');
    }

    if (password.length < 5 || password.length > 10) {
      errors.push('Password must be between 5 and 10 characters.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>0-9]/.test(password)) {
      errors.push('Password must contain at least one special character or number.');
    }
    return errors;
  };

  const validationErrors = validateCredentials(name, password);

  if (validationErrors.length > 0) {
    res.status(400).json({ error: validationErrors.join(' ') });
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
      failedLoginAttempts: 0,
      lockUntil: null,
    };

    await registerUser(newUser);

    try {
      const response = {
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
