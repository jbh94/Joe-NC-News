const connection = require('../db/connection.js');

exports.fetchOneUser = username => {
  return connection
    .select('*')
    .from('users')
    .where({ username })
    .then(user => {
      if (!user.length) {
        return Promise.reject({ status: 404, msg: 'Username not found' });
      } else {
        return user[0];
      }
    });
};
