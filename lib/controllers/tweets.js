const { Router } = require('express');
const Tweet = require('../models/Tweet');
const { authenticate } = require('../middleware/authenticate');


module.exports = Router()
  .post('/', authenticate, async (req, res) => {
    return Tweet.insert({
      ...req.body,
      username: req.user.username,
    })
      .then((tweet) => res.send(tweet));
  })
  .get('/', authenticate, async (req, res) => {
    return Tweet.getAllTweets()
      .then((tweets) => res.send(tweets));
  });
