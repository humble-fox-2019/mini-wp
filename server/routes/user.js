const express = require("express");
const controllers = require("../controllers");

const Router = express.Router();

Router.post("/register", controllers.User.register);
Router.post("/login", controllers.User.login);
Router.post("/googleSignIn", controllers.User.googleSignIn);

module.exports = Router;