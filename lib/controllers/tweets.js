const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .get('/', async (req, res) => {
    const tweets = await Tweet.getAllTweets();

    res.send(tweets);
  });
