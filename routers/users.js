const express = require('express');
const auth = require("../middleware/auth");

const User = require('../models/user');

const router = express.Router();

// GET all users
router.get('/', auth, (req, res) => {
  User.find()
    .then(users => res.send(users))
    .catch(err => res.status(400).send(err));
});

// POST a new user
router.post('/', auth, (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(user => res.send(user))
    .catch(err => res.status(400).send(err));
});

// GET user by ID
router.get('/:id', auth, (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch(err => res.status(400).send(err));
});

// UPDATE user by ID
// PUT 

/*router.put('/:id',auth, (req, res) => {
  User.findById(req.params.id)
  .then(i => {
    User.updatedAt = new Date().toISOString()
    User.name = req.body.name
      // save, then return updated item
      item.save().then(i => res.send(i))
  })
  .catch(err => res.status(400).send(err))
})*/

router.put("/:id", auth, async (req, res) => {
  try {

      const result = await User.updateOne({ _id: req.params.id }, { ...req.body })
      if (result.modifiedCount) {
          userUpdated = await User.findOne({ _id: req.params.id })
          //return res.send({ msg: "update suuccess",  userupdated })
          return res.send(userUpdated)
      }

      res.status(400).send({ msg: " aleardy update " })
  } catch (error) {
      console.log(error)
      res.status(400).send(error)
  }
})

// DELETE user by ID
router.delete('/:id', auth, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => res.status(404).json(err));
});

module.exports = router;
