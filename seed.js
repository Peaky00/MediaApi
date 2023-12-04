require('dotenv').config();
const mongoose = require('mongoose');
const { User, Thought } = require('./models');
const usersData = require('./seeds/users.json');
const thoughtsData = require('./seeds/thoughts.json');
const reactionData = require('./seeds/reaction.json');

const mongoURI = process.env.MONGODB_URI;

async function seedDatabase() {
  try {
    await mongoose.connect(mongoURI);

    await Promise.all([
      User.deleteMany({}),
      Thought.deleteMany({}),
    ]);

    const users = await User.create(usersData);
    const thoughts = await Thought.create(thoughtsData);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
