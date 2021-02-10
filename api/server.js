const express = require('express');
const morgan = require('morgan')
const helmet = require('helmet')
const mw = require('./middleware/middleware')

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.get('/', mw.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
