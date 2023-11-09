/*
    SERVER
*/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
app.use(cors());
app.use(express.urlencoded({ 
    limit: '2mb',
    extended: true,
    parameterLimit: 100000 
}));

const jsonBodyParser = bodyParser.json();

const routes = require('./routes/routes');

app.post('/login', jsonBodyParser, routes.Login);
app.post('/register', jsonBodyParser, routes.Register);

//Profile Page 
app.get('/users/:username', jsonBodyParser, routes.Profile.getProfileById);
app.put('/users/:id', jsonBodyParser, routes.Profile.update); 

//Main feed and posts
app.get('/posts', routes.Post.getAllPostsRoute);
app.get('/posts/:id', routes.Post.getPostByIdRoute);
app.put('/posts/:id', routes.Post.updatePostRoute);
app.delete('/posts/:id', routes.Post.deletePostRoute);

// create Post?
app.post('/posts', routes.Post.createPostRoute);
app.post('/s3Upload', routes.Post.s3UploadRoute);



module.exports = app;
