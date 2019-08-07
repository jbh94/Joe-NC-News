const { fetchArticles } = require('../models/articles-model');

exports.sendArticles = (req, res, next) => {
  fetchArticles()
    .then(articles => {
      console.log(articles);
      res.status(200).send({ articles });
    })
    .catch(next(err));
};
