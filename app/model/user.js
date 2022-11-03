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

function getUserProfileData({
  firstName,
  lastName,
  phone,
  dob,
  email,
  address,
}) {
  return {
    firstName,
    lastName,
    phone,
    dob,
    email,
    address,
  }
}

const { userProfileFields } = require('../utils/user');

function fieldsToUpdate(userData) {
  return Object.keys(userData).reduce(function findValidFields(fields, field) {
    if (userProfileFields[field]) {
      return { ...fields, [field]: userData[field] };
    }
  }, {})
}

module.exports = {
  createUser,
  getUserProfileData,
  fieldsToUpdate,
}
