const { MongoClient } = require('mongodb');
const { dbUrl, dbName } = require('../config/db');
const { createDashboardData } = require('../model/dashboard');

async function getDashbordDetails(req, res) {
  const { username } = req;

  try {
    var dbClient = new MongoClient(dbUrl);
    const db = dbClient.db(dbName);

    const users = db.collection('users');

    const user = await users.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "user not authenticated" });
      return;
    }

    res.status(200).json(createDashboardData(user));
  } catch (err) {
    console.log(err);
    res.status(500);
  } finally {
    dbClient.close();
  }
}

module.exports = {
  getDashbordDetails,
}