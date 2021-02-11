const express = require('express');
const mw = require('../middleware/middleware')
const Posts = require('./posts-model')

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'Error retrieving the posts'
    })
  })
});

router.get('/:id', mw.validatePostId, (req, res) => {
  res.status(200).json(req.post)
});

module.exports = router