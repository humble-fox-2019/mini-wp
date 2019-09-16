const express = require("express");
const controllers = require("../controllers");
const images = require("../helpers/images");

const Router = express.Router();
Router.route("/")
  .get(controllers.Article.index)
  .post(
    images.multer.single("featured_image"),
    images.sendUploadToGCS,
    controllers.Article.store
  );

module.exports = Router;
