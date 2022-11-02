const { getPickups } = require('../controllers/pickup');
module.exports = (app) => {
  app.get('/pickups', getPickups);
}