const { authMiddleware } = require('../middleware/auth');
const { signup, login } = require('../controllers/auth');

module.exports = function authRouter(app) {
  app.post('/signup', authMiddleware, signup);
  app.post('/login', authMiddleware, login);
}