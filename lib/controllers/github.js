const { Router } = require('express');
const { fetchProfile, exchangeCodeForToken } = require('../utils/github');
const GithubUser = require('../models/GithubUser');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`
    https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`);
  })

  .get('/login/callback', async (req, res) => {

    const { code } = req.query;

    const token = await exchangeCodeForToken(code);

    const profile = await fetchProfile(token);

    let user = await GithubUser.getByUsername(profile.username);

    const user = await GithubUser.insert({
      username: profile.username,
      avatar: profile.avatar,
      email: profile.email
    });

  });
