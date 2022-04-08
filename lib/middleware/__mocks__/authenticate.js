/* eslint-disable no-console */
const authenticate = async (req) => {
  req.user = {
    username: 'maze',
    email: 'a@b.com',
    avatar: 'coockoomagoo.com'
  };
};

module.exports = {
  authenticate
};
