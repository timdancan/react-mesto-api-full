const jwt = require("jsonwebtoken");
const AuthError = require("../errors/auth-error");

const { JWT_SECRET_KEY = 'secret_key' } = process.env;

const extractBearerToken = function (header) {
  return header.replace('Bearer ', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization  || !authorization.startsWith('Bearer ')) {
    throw new AuthError("необходма авторизация");
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (e) {
    throw new AuthError("Нет доступа");
  }

  req.user = payload;

  return next();
};
