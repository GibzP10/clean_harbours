const { verifyAuthentication } = require('../middleware/auth');
const { getUserProfile, updateUserProfile } = require('../controllers/user');

module.exports = (app) => {
  app.get('/user', verifyAuthentication, getUserProfile);
  app.post('/user', verifyAuthentication, updateUserProfile);
}