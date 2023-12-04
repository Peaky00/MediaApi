const router = require('express').Router();
const { User } = require('../../models');


// Middleware for error handling
const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    handleErrors(res, err);
  }
});

// GET a single user by _id with populated thought and friend data
router.get('/users/:id', async (req, res) => {
    try {
      const userId = mongoose.Types.ObjectId(req.params.id);
      const user = await User.findById(userId).populate('thoughts friends');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(user);
    } catch (err) {
      handleErrors(res, err);
    }
  });

// POST a new user
router.post('/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    res.status(201).json(user); // 201 Created status code
  } catch (err) {
    handleErrors(res, err);
  }
});

// PUT to update a user by _id
router.put('/users/:id', async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    handleErrors(res, err);
  }
});

// DELETE to remove a user by _id
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(deletedUser);
  } catch (err) {
    handleErrors(res, err);
  }
});

module.exports = router;
