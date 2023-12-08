const { getDb } = require('./DB');

const getUser = async (name) => {
  const db = getDb();
  try {
    const result = await db.collection('User').findOne({ username: name });
    return result;
  } catch (err) {
    // console.log(`error: ${err.message}`);
    return err;
  }
};

const registerUser = async (newUser) => {
  const db = getDb();
  try {
    const result = await db.collection('User').insertOne(newUser);
    return result;
  } catch (err) {
    // console.log(err);
    return err;
  }
};

const updateUserLoginAttempts = async (username, failedLoginAttempts, lockUntil) => {
  const db = getDb();
  try {
    const updateData = {
      $set: {
        failedLoginAttempts,
        lockUntil,
      },
    };
    const result = await db.collection('User').updateOne({ username }, updateData);
    return result;
  } catch (err) {
    console.error('Error updating user login attempts:', err.message);
    return err;
  }
};

module.exports = {
  getUser,
  registerUser,
  updateUserLoginAttempts,
};
