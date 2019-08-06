const { fetchUsers } = require('../models/users-model');

exports.sendUsers = (req, res, next) => {
  fetchUsers().then(users => {
    res.status(200).send({ users });
  });
};
