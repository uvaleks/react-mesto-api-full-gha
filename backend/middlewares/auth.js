const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let payload;

  try {
    const { cookie } = req.headers;

    if (!cookie || !cookie.startsWith('token=')) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    const token = cookie.replace('token=', '');

    console.log(NODE_ENV);
    console.log(JWT_SECRET);

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    console.log('payload', payload);
  } catch (err) {
    next(err);
  }

  req.user = payload;

  return next();
};
