const connection = require('../db/connection.js');

exports.fetchUsers = () => {
  return connection.select('*').from('users');
};
