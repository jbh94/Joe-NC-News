const articlesRouter = require('express').Router();
const {
  sendArticle,
  patchVotes,
  getArticles
} = require('../controllers/articles-controller');
const {
  sendComment,
  getComment
} = require('../controllers/comments-controller');
const { methodNotFound } = require('../errors');

articlesRouter
  .route('/:article_id')
  .get(sendArticle)
  .patch(patchVotes)
  .all(methodNotFound);

articlesRouter
  .route('/:article_id/comments')
  .get(getComment)
  .post(sendComment)
  .all(methodNotFound);

articlesRouter
  .route('/articles')
  .get(getArticles)
  .all(methodNotFound);

module.exports = articlesRouter;
