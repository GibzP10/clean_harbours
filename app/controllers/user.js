const { MongoClient } = require('mongodb')
const { getUserProfileData, fieldsToUpdate } = require('../model/user');

const { dbUrl, dbName } = require('../config/db');

async function getUserProfile(req, res) {
  try {
    const { username } = req;

    var dbClient = new MongoClient(dbUrl)
    const db = dbClient.db(dbName);

    const users = db.collection('users');

    const user = await users.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "user not authenticated" });
      return;
    }

    res.status(200).json(getUserProfileData(user));
  } catch (err) {
    console.log(err);
    req.status(500);
  } finally {
    dbClient.close();
  }
}

async function updateUserProfile(req, res) {
  try {
    const { username } = req;

    var dbClient = new MongoClient(dbUrl)
    const db = dbClient.db(dbName);

    const users = db.collection('users');

    const user = await users.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "user not authenticated" });
      return;
    }

    const fieldsToBeUpdated = fieldsToUpdate(req.body);

    const updatedUser = await users.updateOne({ username }, {
      $set: fieldsToBeUpdated
    })

    console.log(updatedUser)

    if (!updatedUser.acknowledged) {
      res.status(500);
      return;
    }

    res.status(201).json(fieldsToBeUpdated);

  } catch (err) {
    console.log(err);
    req.status(500);
  } finally {
    dbClient.close();
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
}