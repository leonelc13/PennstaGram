const {getAllPosts, getPostById, deletePost, createPost, updatePost} = require('../model/PostDB');
const {ObjectId} = require('mongodb');
const { uploadFile } = require('../utils/s3Operations');
const fs = require('fs');
const formidable = require('formidable');

const getAllPostsRoute = async (req, res) => {
    console.log(req.method, req.originalUrl);
    const posts = await getAllPosts();
    if (!posts) {
        return res.status(404).send({error: 'Posts do not exist'});
    }
    return res.status(200).send(posts);

};

const getPostByIdRoute = async (req, res) => {
    console.log(req.method, req.originalUrl);
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
    console.log(req.method, req.originalUrl);
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
    console.log(req.method, req.originalUrl);
    const form = formidable({});
    form.parse(req, async (err, post, _files) => {
        if (err) {
            console.log(err);
            res.status(401).json({ error: err.message });
            return;
        }

        if (!post.hasOwnProperty('user') || !post.hasOwnProperty('content') || !post.hasOwnProperty('isImage') || !post.hasOwnProperty('url')) {
            return res.status(401).send({error: 'New post is missing some properties'});
        }

        console.log(post);

        const newPost = await createPost(post);
        if (!newPost) {
            return res.status(401).send({error: 'Post creation failed'});
        }
        return res.status(201).send(newPost);
    });
};

const updatePostRoute = async (req, res) => {
    console.log(req.method, req.originalUrl);
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(404).send({error: 'Post does not exist'});
    }
    const id = new ObjectId(req.params.id);
    formidable({}).parse(req, async (err, post, _files) => {
        if (err) {
            console.log(err);
            res.status(401).json({ error: err.message });
            return;
        }

        const updatedPost = await updatePost(id, post);
        if (!updatedPost) {
            res.status(401).json({error: 'Post update failed'});
        }
        res.status(200).json(updatedPost);
    });
}

const s3UploadRoute = async (req, res) => {
    console.log(req.method, req.originalUrl);
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            res.status(401).json({ error: err.message });
            return;
        }
        
        //create a buffer to cache uploaded file
        let cacheBuffer = Buffer.alloc(0);

        // create a stream from the virtual path of the uploaded file
        const fStream = fs.createReadStream(files.file.filepath);

        fStream.on('data', (chunk) => {
            // fill the buffer with data from the uploaded file
            cacheBuffer = Buffer.concat([cacheBuffer, chunk]);
        });

        fStream.on('end', async () => {
            // send buffer to AWS - The url of the object is returned
            const s3URL =  await uploadFile(cacheBuffer, files.file.originalFilename);
            console.log('end', cacheBuffer.length);

            // You can store the URL in mongoDB along with the rest of the data
            // send a response to the client
            res.status(201).json({ message: s3URL });
        });   
    });
}

const PostRoutes = {
    getAllPostsRoute: getAllPostsRoute,
    getPostByIdRoute: getPostByIdRoute,
    deletePostRoute: deletePostRoute,
    createPostRoute: createPostRoute,
    updatePostRoute: updatePostRoute,
    s3UploadRoute: s3UploadRoute
    //getPostsByUserRoute: getPostsByUserRoute,
}

module.exports = PostRoutes;
