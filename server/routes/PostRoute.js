const {getAllPosts, getPostById, getPostsByUser, deletePost, createPost, updatePost} = require('../model/PostDB');
const {ObjectId} = require('mongodb');

const getAllPostsRoute = async (req, res) => {
    
    const posts = await getAllPosts();
    if (!posts) {
        return res.status(404).send({error: 'Posts do not exist'});
    }
    return res.status(200).send(posts);

};

const getPostByIdRoute = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(404).send({error: 'Post does not exist'});
    }

    const id = new ObjectId(req.params.id);
    // console.log('in PostRoute', id);
    const post = await getPostById(id);
    if (!post) {
        return res.status(404).send({error: 'Post does not exist'});
    }
    return res.status(200).send(post);
};

// const getPostsByUserRoute = async (req, res) => {
//     const username = req.params.username;
//     const posts = await getPostsByUser(username);
//     if (!posts) {
//         return res.status(404).send({error: 'Posts do not exist'});
//     }
//     console.log("in PostRoute, getPostsByUserRoute", posts)
//     return res.status(200).send(posts);
// };

const deletePostRoute = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(404).send({error: 'Post does not exist'});
    }

    const id = new ObjectId(req.params.id);
    const post = await deletePost(id);
    if (!post) {
        return res.status(404).send({error: 'Post does not exist'});
    }
    return res.status(200).send(post);
};

const createPostRoute = async (req, res) => {
    const post = req.body;
    if (!post.hasOwnProperty('user') || !post.hasOwnProperty('content') || !post.hasOwnProperty('isImage') || !post.hasOwnProperty('url')) {
        return res.status(401).send({error: 'Post creation failed'});}
    const newPost = await createPost(post);
    if (!newPost) {
        return res.status(401).send({error: 'Post creation failed'});
    }
    return res.status(201).send(newPost);

};

const updatePostRoute = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(404).send({error: 'Post does not exist'});
    }
    const id = new ObjectId(req.params.id);
    const post = req.body;
    const updatedPost = await updatePost(id, post);
    if (!updatedPost) {
        return res.status(401).send({error: 'Post update failed'});
    }
    return res.status(200).send(updatedPost);
}


const PostRoutes = {
    getAllPostsRoute: getAllPostsRoute,
    getPostByIdRoute: getPostByIdRoute,
    deletePostRoute: deletePostRoute,
    createPostRoute: createPostRoute,
    updatePostRoute: updatePostRoute
    //getPostsByUserRoute: getPostsByUserRoute,
}

module.exports = PostRoutes;
