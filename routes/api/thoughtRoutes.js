const mongoose = require('mongoose'); // Import mongoose
const router = require('express').Router();
const { Thought, User } = require('../../models');



// GET all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single thought by _id
router.get('/thoughts/:id', async (req, res) => {
    try {
      const thoughtId = new mongoose.Types.ObjectId(req.params.id); // Use 'new' keyword
      const thought = await Thought.findById(thoughtId).populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

// POST a new thought for a specific user
router.post('/thoughts', async (req, res) => {
  try {
    const { thoughtText, username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const thought = await Thought.create({ thoughtText, username });
    user.thoughts.push(thought);
    await user.save();
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT to update a thought by _id
router.put('/thoughts/:id', async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const { thoughtText } = req.body;
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by _id
router.delete('/thoughts/:id', async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if (!deletedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.json(deletedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
