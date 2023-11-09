const { ObjectId } = require('mongodb');
const { getUserById, updateUser, getAllUsers } = require('../model/ProfilePageDB');
// const routes = require('./routes/Routes');

const getProfileById = async (req, res) => {
  // console.log("checking out profile page");
  // console.log("req.params", req.params);
  const { username } = req.params;
  const user = await getUserById(username);
  if (!user) {
    return res.status(404).send({ error: 'User does not exist' });
  }
  return res.status(200).send(user);
};

const updateUserRoute = async (req, res) => {
  const userid = new ObjectId(req.params.id);
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    profile: req.body.profile,
    followers: req.body.followers,
    following: req.body.following,
  };

  const user = await updateUser(userid, newUser);
  if (!user) {
    return res.status(401).send({ error: 'User update failed' });
  }
  return res.status(200).send(user);
};

const getAllProfiles = async (req, res) => {
  const users = await getAllUsers();
  if (!users) {
    return res.status(401).send({ error: 'No users found' });
  }
  return res.status(200).send(users);
};

const ProfileRoutes = {
  getProfileById,
  update: updateUserRoute,
  getAllProfiles,
};
module.exports = ProfileRoutes;
