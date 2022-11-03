const { getDashbordDetails } = require('../controllers/dashboard');
const { verifyAuthentication } = require('../middleware/auth');

module.exports = (app) => {
  app.get('/dashboard', verifyAuthentication, getDashbordDetails);
}