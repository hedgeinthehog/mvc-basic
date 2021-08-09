const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.split(' ')[1] : null;

  if (!token) return res.sendStatus(401);

  const { SECRET_KEY } = process.env;
  jwt.verify(token, SECRET_KEY, (e, user) => {
    if (e) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}

module.exports = authenticateToken;