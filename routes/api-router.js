const apiRouter = require('express').Router();
const topicsRouter = require('./topics-router');
const usersRouter = require('./users-router');
const { methodNotFound } = require('../errors/errors');

apiRouter
  .get('/', (req, res, next) => {
    res.status(200).send({ msg: 'You have reached the api router' });
  })
  .all(methodNotFound);

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/:username', usersRouter);

module.exports = apiRouter;
