const { getPickups, addPickup } = require('../controllers/pickup');
const { verifyAuthentication } = require('../middleware/auth');

module.exports = (app) => {
  app.get('/pickups', verifyAuthentication, getPickups);
  app.post('/pickup', verifyAuthentication, addPickup);
}