const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const usersRouter = require('./routes/users-router');
const {
  SQLerrors,
  customErrors,
  serverError,
  routeError
} = require('./errors/errors');

app.use(express.json());

app.use('/api', apiRouter);
app.use('/user/:username', usersRouter);

app.use(SQLerrors);
app.use(customErrors);
app.use(serverError);
app.all('/*', routeError);

module.exports = app;
