const pickup = require('../controllers/pickup.controller');
module.exports = (app)=>{
  const router = require('express').Router();
  app.use('/api', router);
  router.get('/getPickups', pickup.getPickups);
}