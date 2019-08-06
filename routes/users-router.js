const usersRouter = require('express').Router();
const { sendUsers } = require('../controllers/users-controller');

usersRouter.route('/:username').get(sendUsers);

module.exports = usersRouter;
