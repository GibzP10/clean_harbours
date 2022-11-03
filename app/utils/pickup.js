const pickupVendors = {
  plastic_paper: {
    vendorName: 'khaliBottle',
    pickupTime: {
      hour: 10,
      minute: 30,
    }
  },
  eWaste: {
    vendorName: 'zolopic',
    pickupTime: {
      hour: 10,
      minute: 00,
    }
  },
  organic: {
    vendorName: 'bengaluru_municipality ',
    pickupTime: {
      hour: 07,
      minute: 30,
    }
  },
  donation: {
    vendorName: 'sads_india',
    pickupTime: {
      hour: 08,
      minute: 00,
    }
  }
};

module.exports = {
  pickupVendors,
}