const users = [];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random full name
  const getRandomName = () =>
    `${getRandomArrItem(names)}${getRandomArrItem(names)}`;
  
  // Function to generate random videos that we can add to the database. Includes video responses.
  const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(descriptionsBodies),
        username: getRandomName(),
        reactions: [...getThoughtReactions(3)],
      });
    }
    return results;
  };
  
  // Create the responses that will be added to each video
  const getThoughtReactions = (int) => {
    if (int === 1) {
      return getRandomArrItem(possibleResponses);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(possibleResponses),
        username: getRandomName(),
      });
    }
    return results;
  };
  
  // Export the functions for use in seed.js
  module.exports = { getRandomName, getRandomThoughts, getRandomThoughts };
  