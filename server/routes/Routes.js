
const LoginRoute = require("./LoginRoute");
const RegisterRoute = require("./RegisterRoute");

// Routes Tree
var routes = {
    Login: LoginRoute,
    Register: RegisterRoute
}

module.exports = routes;