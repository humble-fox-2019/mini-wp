const models = require("../models");

function authorization (req, res, next) {
  models.Article.findOne({
    _id: req.params.id
  })
    .then(article => {
      if (article.author == req.decode._id) next();
      else
        next({
          status: 401,
          message: "you don't have the authority to do this action"
        });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = authorization
