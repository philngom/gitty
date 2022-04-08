/* eslint-disable no-console */
module.exports = async (req, res, next) => {
  req.user = {
    username: 'maze',
    email: 'a@b.com',
    avatar: 'coockoomagoo.com'
  };

  next();
};
