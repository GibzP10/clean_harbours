const { pickupVendors } = require("../utils/pickup");

function createPickups(pickupTypes, address) {
  const date = new Date();
  return pickupTypes.map(function makePickupObject(type) {
    return {
      type,
      vendor: pickupVendors[type].vendorName,
      time: new Date(
        // leap year and month days has to be considered
        date.getUTCDate() + 1,
        date.getUTCMonth(),
        date.getUTCFullYear(),
        pickupVendors[type].pickupTime.hour,
        pickupVendors[type].pickupTime.minute
      ).getTime(),
      address,
    };
  });
}

module.exports = {
  createPickups,
}