const articlesRouter = require('express').Router();
const { sendArticle } = require('../controllers/articles-controller');
const { methodNotFound } = require('../errors');

articlesRouter
  .route('/:article_id')
  .get(sendArticle)
  .all(methodNotFound);

module.exports = articlesRouter;
