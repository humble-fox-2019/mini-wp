const models = require("../models");

class Article {
  static index(req, res, next) {
    const author = req.decode._id;

    models.Article.find({
      author
    })
      .then(articles => {
        res.status(200).json(articles);
      })
      .catch(next);
  }

  static store(req, res, next) {
    const author = req.decode._id;
    const { title, content } = req.body;
    const featured_image = req.file.cloudStoragePublicUrl;
    models.Article.create({
      title,
      content,
      featured_image,
      author
    })
      .then(article => {
        res.status(201).json(article);
      })
      .catch(next);
  }
}

module.exports = Article;
