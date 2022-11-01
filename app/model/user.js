function createUser({ username, password, }) {
  return {
    username,
    password,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: {
      street: '',
      city: '',
      pincode: ''
    },
    pickups: [],
    wasteData: [],
  };
}

module.exports = {
  createUser,
}