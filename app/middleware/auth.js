const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;

const { username: usernameRegex, password: passwordRegex } = require('../utils/regex')

function authMiddleware(req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Fields are empty' });
    return;
  }

  if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
    res.status(400).json({ message: 'invalid format for username or password' })
    return;
  }

  next();

  if (res.statusCode === 200 || res.statusCode === 201) {
    const jwtToken = jwt.sign({
      username,
    }, JWT_KEY, {
      expiresIn: '1h'
    });

    res.set('x-auth-token', jwtToken);
    res.set("Access-Control-Expose-Headers", "x-auth-token");
  }
}

module.exports = {
  authMiddleware,
}