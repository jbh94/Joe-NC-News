const connection = require('../db/connection.js');

exports.postComment = ({ article_id }, { username, body }) => {
  return connection('comments')
    .insert({ article_id, author: username, body })
    .returning('*')
    .then(comment => {
      return comment[0];
    });
};

exports.fetchComment = ({ article_id }) => {
  return connection('comments')
    .select('comments.*')
    .where('comments.article_id', '=', article_id)
    .then(comments => {
      if (!comments.length) {
        return Promise.reject({ status: 404, msg: 'Comment not found' });
      }
      return comments;
    });
};
