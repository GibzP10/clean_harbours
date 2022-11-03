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
};

module.exports = {
  pickupVendors,
}