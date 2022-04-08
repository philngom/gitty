const { Router } = require('express');
const Tweet = require('../models/Tweet');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res) => {
    console.log('yo yoyo', req.user);
    const tweet = await Tweet.insert({
      ...req.body,
      username: req.user.username,
    });

    res.send(tweet);
  })
  .get('/', async (req, res) => {
    const tweets = await Tweet.getAllTweets();

    res.send(tweets);
  });
