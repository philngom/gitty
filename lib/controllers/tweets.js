const { Router } = require('express');
const Tweet = require('../models/Tweet');
const { authenticate } = require('../middleware/authenticate');


module.exports = Router()
  .post('/', authenticate, async (req, res) => {
    const tweet = await Tweet.insert({
      ...req.body,
      username: req.user.username,
    });

    res.send(tweet);
  })
  .get('/', authenticate, async (req, res) => {
    const tweets = await Tweet.getAllTweets();

    res.send(tweets);
  });
