const express = require('express');
const mw = require('../middleware/middleware')

const User = require('./users-model')
const Posts = require('../posts/posts-model')

const router = express.Router();

router.get('/', (req, res) => {
  User.get(req.query)
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'Error retrieving the users'
    })
  })
});

router.get('/:id', mw.validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.post('/', mw.validateUser, (req, res) => {
  User.insert(req.body)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'Error adding user'
    })
  })
});

router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  User.update(req.user.id, req.body)
  .then((update) => {
    res.status(200).json(update)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({ 
      message: 'Error updating user' 
    })
  })
});

router.delete('/:id', mw.validateUserId, (req, res) => {
  User.remove(req.user.id)
  .then((deleted) => {
    res.status(200).json(deleted)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({
      message: 'Error deleting User'
    })
  })
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  User.getUserPosts(req.user.id)
  .then((user) => {
    res.status(201).json(user)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({
      message: 'Error getting user posts'
    })
  })
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, (req, res) => {
  const post = {user_id: req.user.id, text: req.body.text }

  Posts.insert(post)
    .then((posted) => {
      res.status(201).json(posted)
    })
    .catch((err) => {
      res.status(500).json({ 
        message: 'Error adding post'
      })
    })
});

module.exports = router