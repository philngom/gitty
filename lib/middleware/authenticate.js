const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const { session } = req.cookies;
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
  authenticate,
};
