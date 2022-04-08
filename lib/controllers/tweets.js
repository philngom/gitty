const { Router } = require('express');
const Tweet = require('../models/Tweet');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/', authenticate, async (req, res) => {
    const tweets = await Tweet.getAllTweets();

    res.send(tweets);
  });
