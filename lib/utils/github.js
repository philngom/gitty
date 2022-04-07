const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  console.log('🚀 ~ file: github.js ~ line 4 ~ exchangeCodeForToken ~ code', code);
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code
    }),
  });

  const { access_token } = await res.json();
  console.log('🚀 ~ file: github.js ~ line 19 ~ exchangeCodeForToken ~ access_token', access_token);

  return access_token;
};

module.exports = { exchangeCodeForToken };
