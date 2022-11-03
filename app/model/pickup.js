const { pickupVendors } = require("../utils/pickup");

function createPickups(pickupTypes, address) {
  const date = new Date();

  return pickupTypes.map(function makePickupObject(type) {
    return {
      type,
      vendor: pickupVendors[type].vendorName,
      time: new Date(
        // leap year and month days has to be considered
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate() + 1,
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