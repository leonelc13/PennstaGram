const {getAllPosts, getPostById, getPostsByUser, deletePost} = require('../model/PostDB');
const {ObjectId} = require('mongodb');

const getAllPostsRoute = async (req, res) => {
    try{
        const posts = await getAllPosts();

        res.status(200).json(posts);
        return res;
    } catch(err){
        console.log('Error in getting posts', err);
        res.status(404).json({message: err.message});
        return res;
    }

};

const getPostByIdRoute = async (req, res) => {
    const id = new ObjectId(req.params.id);
    // console.log('in PostRoute', id);
    try{
        const post = await getPostById(id);
        res.status(200).json(post);
        return res;
    } catch(err){
        console.log('Error in getting post', err);
        res.status(404).json({message: err.message});
        return res;
    }
};

const getPostsByUserRoute = async (req, res) => {
    const username = req.params.username;
    try{
        const posts = await getPostsByUser(username);
        res.status(200).json(posts);
        return res;
    } catch(err){
        console.log('Error in getting posts', err);
        res.status(404).json({message: err.message});
        return res;
    }
};

const deletePostRoute = async (req, res) => {
    const id = req.params.id;
    try{
        const post = await deletePost(id);
        res.status(200).json(post);
        return res;
    } catch(err){
        console.log('Error in deleting post', err);
        res.status(404).json({message: err.message});
        return res;
    }
};

const PostRoutes = {
    getAllPostsRoute: getAllPostsRoute,
    getPostByIdRoute: getPostByIdRoute,
    getPostsByUserRoute: getPostsByUserRoute,
    deletePostRoute: deletePostRoute
}

module.exports = PostRoutes;