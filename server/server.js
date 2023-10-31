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

// Profile Page
//app.get('/profile', routes.ProfilePage.getProfileByUsername);

module.exports = app;