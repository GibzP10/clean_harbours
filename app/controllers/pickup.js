const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const { dbUrl, dbName } = require('../config/db');
const { createPickups } = require('../model/pickup');

async function getPickups(req, res) {
  try {
    var dbClient = new MongoClient(dbUrl);
    const db = dbClient.db(dbName);
    const users = db.collection('users');

    const user = await users.findOne({ username: req.username });

    if (!user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const { pickups } = user;

    const currentTime = new Date().getTime();

    const filteredPickups = pickups.filter(function getUpcomingPickups(pickup) {
      return pickup.time > currentTime;
    })

    res.status(200).json({ pickups: filteredPickups });
  } catch (err) {
    console.log(err);
    res.status(500);
  } finally {
    dbClient.close();
  }
};

async function addPickup(req, res) {
  try {
    var dbClient = new MongoClient(dbUrl);
    const db = dbClient.db(dbName);
    const users = db.collection('users');

    const user = await users.findOne({ username: req.username });

    if (!user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const { pickups, address } = req.body;

    const newPickupData = createPickups(pickups, address);

    const { modifiedCount } = await users.updateOne(
      { username: req.username },
      { $set: { pickups: [...user.pickups, ...newPickupData] } }
    )

    if (!modifiedCount) {
      res.status(500).json({ message: "Some error occured, please try again" });
      return;
    }

    res.status(200).json({ pickups: newPickupData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Some error occured, please try again" });
  } finally {
    dbClient.close();
  }
}

module.exports = { getPickups, addPickup };