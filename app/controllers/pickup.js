const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const { dbUrl, dbName } = require('../config/db');
const { JWT_KEY } = process.env;

const getPickups = async (req, res) => {
  const authToken = req.header('X-Auth-Token');
  if (!authToken) {
    res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    var { username } = jwt.verify(authToken, JWT_KEY);
  } catch (err) {
    console.log('Error occured: ', err);
    res.status(403).json({ message: 'User session expired' });
  }

  try {
    var dbClient = new MongoClient(dbUrl);
    const db = dbClient.db(dbName);
    const users = db.collection('users');

    const user = await users.findOne({ username });

    if (!user) {
      res.status(401).json({ message: 'User not authenticated' });
    }

    const { pickups } = user;

    res.status(200).json(pickups);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Some error occured, please try again" });
  } finally {
    dbClient.close();
  }
};

module.exports = { getPickups };