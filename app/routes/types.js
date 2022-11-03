const { verifyAuthentication } = require('../middleware/auth');
const { getTypes } = require('../controllers/types');

module.exports = (app) => {
  app.get('/types', verifyAuthentication, getTypes);
}