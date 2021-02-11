const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')
const mw = require('./middleware/middleware')

const server = express();

const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router')

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and routes need to be connected here
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', mw.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
