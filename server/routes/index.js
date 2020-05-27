const express = require('express')
const authentication = require("../middlewares/authentication");
const article = require('./article')
const user = require("./user");

const Router = express.Router()

Router.get('/', (req, res, next) => {
    res.status(200).json({
        "message" : "App Running"
    })
})

Router.use("/user", user);
Router.use(authentication)
Router.use('/article', article)

module.exports = Router