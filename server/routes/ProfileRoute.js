const { getUserById, updateUser } = require('../model/ProfilePageDB');
const {ObjectId} = require('mongodb');

const getProfileById = async (req, res) => {
    // console.log("checking out profile page");
    // console.log("req.params", req.params);
    const username  = req.params.username;

    try{
        const user = await getUserById(username);
        res.status(200).json(user);
        // console.log("user", user);
        return res;
    } catch(err){
        console.log('Error in getting user', err);
        res.status(404).json({message: err.message});
    }
};

const updateUserRoute = async (req, res) => {
    console.log("in Profile Route, request body", typeof(req.body));
    const userid = new ObjectId(req.params.id);
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        profile: req.body.profile,
        followers: req.body.followers,
        following: req.body.following}
    try{
        const user = await updateUser(userid, newUser);
        res.status(200).json(user);
        return res;
    } catch(err){
        console.log('Error in updating user', err);
        res.status(404).json({message: err.message});
        return res;
    }
};


const ProfileRoutes = {
    getProfileById: getProfileById,
    update: updateUserRoute
}
module.exports = ProfileRoutes;