const LoginRoute = require('./LoginRoute');
const RegisterRoute = require('./RegisterRoute');
const ProfileRoute = require('./ProfileRoute');
const PostRoutes = require('./PostRoute');

// Routes Tree
const routes = {
  Login: LoginRoute,
  Register: RegisterRoute,
  Profile: ProfileRoute,
  Post: PostRoutes,
};

module.exports = routes;
