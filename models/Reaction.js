const { Schema } = require('mongoose');

const ReactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280, // Maximum 280 characters for the reaction body
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // Add a getter method to format the timestamp on query
    get: (timestamp) => new Date(timestamp).toDateString(),
  },
});

module.exports = ReactionSchema;
