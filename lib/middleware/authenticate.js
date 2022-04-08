const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const session = req.cookies[process.env.COOKIE_NAME];
    const payload = jwt.verify(session, process.env.JWT_SECRET);

    req.user = payload;


    next();
  } catch (error) {
    error.message = 'You must be signed in to continue';
    error.status = 401;
    next(error);
  }
};

module.exports = {
  authenticate
};
