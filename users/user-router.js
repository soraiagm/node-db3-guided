const express = require('express');

const Users = require('./model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Users.list()
    .then(users => {
      res.json(users);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
});


// move db logic to model file
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Users.findById(id)
  .then(user => {
    // console.log("users", users);
    // const user = users[0];
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

router.post('/', (req, res) => {
  const userData = req.body;
    Users.insert(userData)
      .then(created => {
        res.status(201).json(created);
    })
      .catch(err => {
        res.status(500).json({ message: 'Failed to create new user' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
  .then(count => {
    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Users.remove(id)
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

module.exports = router;