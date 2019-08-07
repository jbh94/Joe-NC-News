const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
// const usersRouter = require('./routes/users-router');
// const articlesRouter = require('./routes/articles-router');
const {
  SQLerrors,
  customErrors,
  serverError,
  routeError
} = require('./errors');

app.use(express.json());

app.use('/api', apiRouter);

app.use(SQLerrors);
app.use(customErrors);
app.use(serverError);
app.all('/*', routeError);

module.exports = app;
