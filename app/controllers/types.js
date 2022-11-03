const { pickupVendors } = require('../utils/pickup')

function getTypes(req, res) {
  const types = Object.keys(pickupVendors).map(function handleType(type) {
    return { type };
  });

  return res.status(200).json(types);
}

module.exports = {
  getTypes
}