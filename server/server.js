/*
    SERVER
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.urlencoded({
  limit: '2mb',
  extended: true,
  parameterLimit: 100000,
}));

const jsonBodyParser = bodyParser.json();

const routes = require('./routes/Routes');

app.use(express.static(path.join(__dirname, '../client/build')));

app.post('/login', jsonBodyParser, routes.Login);
app.post('/register', jsonBodyParser, routes.Register);

// Profile Page
app.get('/users/:username', jsonBodyParser, routes.Profile.getProfileById);
app.get('/users', jsonBodyParser, routes.Profile.getAllProfiles);
app.put('/users/:id', jsonBodyParser, routes.Profile.update);

// Main feed and posts
app.get('/posts', routes.Post.getAllPostsRoute);
app.get('/posts/:id', routes.Post.getPostByIdRoute);
app.put('/posts/:id', routes.Post.updatePostRoute);
app.delete('/posts/:id', routes.Post.deletePostRoute);
app.get('/posts/byUser/:username', routes.Post.getPostsByUserRoute);

// create Post?
app.post('/posts', routes.Post.createPostRoute);
app.post('/s3Upload', routes.Post.s3UploadRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
module.exports = app;
