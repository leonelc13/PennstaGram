const { ObjectId } = require('mongodb');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const formidable = require('formidable');
const { uploadFile } = require('../utils/s3Operations');
const {
  getAllPosts, getPostById, deletePost, createPost, updatePost, getPostsByUser,
} = require('../model/PostDB');
const { verifyUser } = require('../utils/auth');

const getAllPostsRoute = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    const posts = await getAllPosts(page, limit);
    if (!posts) {
      return res.status(404).send({ error: 'Posts do not exist' });
    }
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const getPostByIdRoute = async (req, res) => {
  // console.log(req.method, req.originalUrl);
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send({ error: 'Post does not exist' });
  }

  const id = new ObjectId(req.params.id);
  // console.log('in PostRoute', id);
  const post = await getPostById(id);
  if (!post) {
    return res.status(404).send({ error: 'Post does not exist' });
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
  // console.log(req.method, req.originalUrl);
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send({ error: 'Post does not exist' });
  }

  const id = new ObjectId(req.params.id);

  if (await verifyUser(req.headers.authorization)) {
    const post = await deletePost(id);
    if (!post) {
      return res.status(404).send({ error: 'Post does not exist' });
    }
    return res.status(200).send(post);
  }
  return res.status(401).send({ error: 'Failed Authentication' });
};

const createPostRoute = async (req, res) => {
  // console.log(req.method, req.originalUrl);
  const form = new formidable.IncomingForm();
  // eslint-disable-next-line no-unused-vars
  form.parse(req, async (err, post, _files) => {
    if (err) {
      // console.log(err);
      res.status(401).json({ error: err.message });
      return {};
    }

    // eslint-disable-next-line max-len
    // if (!post.prototype.hasOwnProperty.call('user') || !post.prototype.hasOwnProperty.call('content')
    // eslint-disable-next-line max-len
    // || !post.prototype.hasOwnProperty.call('isImage') || !post.prototype.hasOwnProperty.call('url')) {
    if (!post.user || !post.content || !post.isImage || !post.url) {
      return res.status(401).send({ error: 'New post is missing some properties' });
    }

    // console.log(post);

    const newPost = await createPost(post);
    if (!newPost) {
      return res.status(401).send({ error: 'Post creation failed' });
    }
    return res.status(201).send(newPost);
  });
};

const updatePostRoute = async (req, res) => {
  // console.log(req.method, req.originalUrl);
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send({ error: 'Post does not exist' });
  }
  const id = new ObjectId(req.params.id);
  const form = new formidable.IncomingForm();
  // eslint-disable-next-line no-unused-vars
  form.parse(req, async (err, post, _files) => {
    if (err) {
      // console.log(err);
      res.status(401).json({ error: err.message });
      return {};
    }

    const updatedPost = await updatePost(id, post);
    if (!updatedPost) {
      res.status(401).json({ error: 'Post update failed' });
    }
    return res.status(200).json(updatedPost);
  });
  return {};
};

const getPostsByUserRoute = async (req, res) => {
  // console.log("getPostsByUserRoute", req.params);
  const { username } = req.params;
  const posts = await getPostsByUser(username);
  // console.log('params', req);
  if (!posts) {
    return res.status(404).send({ error: 'Posts do not exist' });
  }
  // console.log('in PostRoute, getPostsByUserRoute', posts);
  return res.status(200).send(posts);
};

const s3UploadRoute = async (req, res) => {
  // console.log(req.method, req.originalUrl);
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      // console.log(err);
      res.status(401).json({ error: err.message });
      return;
    }

    // create a buffer to cache uploaded file
    let cacheBuffer = Buffer.alloc(0);

    // create a stream from the virtual path of the uploaded file
    // console.log(' s3 uploading: ', files.file[0].filepath);
    const fStream = fs.createReadStream(files.file[0].filepath);

    fStream.on('data', (chunk) => {
      // fill the buffer with data from the uploaded file
      cacheBuffer = Buffer.concat([cacheBuffer, chunk]);
    });

    fStream.on('end', async () => {
      // send buffer to AWS - The url of the object is returned
      const s3URL = await uploadFile(cacheBuffer, files.file[0].originalFilename);
      // console.log('end', cacheBuffer.length);

      // You can store the URL in mongoDB along with the rest of the data
      // send a response to the client
      res.status(201).json({ message: s3URL });
    });
  });
};

const PostRoutes = {
  getAllPostsRoute,
  getPostByIdRoute,
  deletePostRoute,
  createPostRoute,
  updatePostRoute,
  s3UploadRoute,
  getPostsByUserRoute,
  // getPostsByUserRoute: getPostsByUserRoute,
};

module.exports = PostRoutes;
