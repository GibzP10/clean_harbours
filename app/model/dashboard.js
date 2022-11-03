function createDashboardData({ firstName, lastName, wasteData }) {
  return {
    firstName,
    lastName,
    wasteData: [
      {
        type: 'plastic_paper',
        itemsPickedUp: 25,
        paymentRecieved: 64,
      },
      {
        type: 'eWaste',
        itemsPickedUp: 10,
        paymentRecieved: 105,
      },
      {
        type: 'organic',
        itemsPickedUp: 65,
        paymentRecieved: 0,
      },
      {
        type: 'donation',
        itemsPickedUp: 10,
        paymentRecieved: 0,
      },
    ]
  }
}

module.exports = {
  createDashboardData,
}