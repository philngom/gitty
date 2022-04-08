const { Router } = require('express');
const { fetchProfile, exchangeCodeForToken } = require('../utils/github');
const GithubUser = require('../models/GithubUser');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const { sign } = require('../utils/jwt');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`
    https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`);
  })

  .get('/login/callback', async (req, res, next) => {

    const { code } = req.query;

    const token = await exchangeCodeForToken(code);

    const profile = await fetchProfile(token);

    let user = await GithubUser.getByUsername(profile.username);

    if (!user) {
      user = await GithubUser.insert({
        username: profile.username,
        avatar: profile.avatar,
        email: profile.email
      });
    }

    const payload = await sign(user);

    res
      .cookie(process.env.COOKIE_NAME, payload, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS
      })
      .redirect('/api/v1/tweets');
  })

  .delete('/', async (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'You have successfully signed out!' });
  });
