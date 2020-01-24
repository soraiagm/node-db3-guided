const express = require('express');

const Posts = require('./model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.list()
    .then(posts => {
      res.json(posts);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get posts' });
    });
});


// move db logic to model file
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Posts.findById(id)
  .then(post => {
    // console.log("users", users);
    // const user = users[0];
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Could not find post with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get post' });
  });
});


module.exports = router;