const articlesRouter = require('express').Router();
const { sendArticles } = require('../controllers/articles-controller');
const { methodNotFound } = require('../errors');

articlesRouter.route('/').get(sendArticles);
articlesRouter
  .route('/articles/:article_id')
  .get(sendArticles)
  .all(methodNotFound);

module.exports = articlesRouter;
