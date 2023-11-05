/*
    SERVER
*/

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.urlencoded(
    { extended: true },
));
app.use(bodyParser.json());

const routes = require('./routes/routes');

app.post('/login', routes.Login);
app.post('/register', routes.Register);

//Profile Page 
app.get('/users/:username', routes.Profile.getProfileById);
app.put('/users/:id', routes.Profile.update); 

//Main feed and posts
app.get('/posts', routes.Post.getAllPostsRoute);
app.get('/posts/:id', routes.Post.getPostByIdRoute);


// Profile Page
//app.get('/profile', routes.ProfilePage.getProfileByUsername);

module.exports = app;