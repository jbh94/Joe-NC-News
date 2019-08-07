const connection = require('../db/connection.js');

exports.fetchArticles = () => {
  return connection
    .select('articles.*')
    .count({ comment_count: 'article_id' })
    .leftjoin('comments', 'articles.article_id', 'comment.article_id')
    .groupBy('articles.article_id');
};
// if (!articles_id.length) {
//   return Promise.reject({
//     status: 404,
//     msg: 'Not found'
//   });
// }
