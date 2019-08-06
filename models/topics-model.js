const connection = require('../db/connection.js');

exports.fetchTopics = () => {
  return connection.select('*').from('topics');
};
