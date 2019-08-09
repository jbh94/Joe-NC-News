const connection = require('../db/connection.js');

exports.fetchArticles = article_id => {
  return connection
    .select('articles.*')
    .from('articles')
    .count('comment_id AS comment_count')
    .where('articles.article_id', article_id)
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .then(articleData => {
      if (!articleData.length) {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      } else {
        return articleData[0];
      }
    });
};

exports.updateVotes = (article_id, inc_votes) => {
  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      msg: 'Bad request - Body must contain the key inc_votes'
    });
  } else {
    if (inc_votes !== inc_votes.length && 'number' < 1) {
      inc_votes = 0;
    }
  }
  return connection
    .select('votes.*')
    .from('articles')
    .increment('votes', inc_votes)
    .where({ article_id })
    .returning('*')
    .then(articleData => {
      if (!articleData.length) {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      } else {
        return articleData[0];
      }
    });
};

exports.postComment = ({ article_id }, { username, body }) => {
  return connection('comments')
    .insert({ article_id, author: username, body })
    .returning('*')
    .then(comment => {
      return comment[0];
    });
};

exports.getAllArticles = () => {
  return connection('articles')
    .select(
      'articles.author',
      'articles.title',
      'articles.article_id',
      'articles.topic',
      'articles.created_at',
      'articles.votes'
    )
    .count({ comment_count: 'comments.article_id' })
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .then(articles => {
      if (!articles.length) {
        return Promise.reject({ status: 404, msg: 'Articles not found' });
      } else return articles;
    });
};
