const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}, Request Timestamp: ${new Date().toUTCString()}`)
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  User.getById(id)
    .then((user) => {
      if (user){
        console.log(`User ${user} found.`)
        req.user=user
        next();
      } else {
        res.status(404).json({ message: "user not found" })
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Error ${err}`})
    })
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  } else {
    if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" })
    } else {
      next();
    }
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  } else {
    if (!req.body.text) {
      res.status(400).json({ message: "missing required text field" })
    } else {
      next();
    }
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}