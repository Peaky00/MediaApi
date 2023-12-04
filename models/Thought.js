const { Schema, model } = require('mongoose'); // Import the necessary modules
const ReactionSchema = require('./Reaction'); // Import the ReactionSchema

// Define the Thought schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Add a getter method to format the timestamp on query
    get: (timestamp) => new Date(timestamp).toDateString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema], // Use the imported ReactionSchema
});

// Define a virtual called reactionCount to retrieve the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
