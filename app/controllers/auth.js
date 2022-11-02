const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const { dbUrl, dbName } = require('../config/db');
const { createUser } = require('../model/user');


async function signup(req, res) {
  const { username, password } = req.body;

  try {
    var dbClient = new MongoClient(dbUrl);
    const db = dbClient.db(dbName);
    const users = db.collection('users');

    const userInDb = await users.findOne({ username });

    if (userInDb) {
      res.status(403).json({ message: 'User already registered' });
      return;
    }

    const newUser = createUser({ username, password: bcrypt.hashSync(password, 10) })

    const { acknowledged } = await users.insertOne(newUser)

    if (acknowledged) {
      res.status(201).json({ username });
    }

  } catch (err) {
    console.log('Error occured: ', err);
    res.status(500);
  } finally {
    dbClient.close();
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    var dbClient = new MongoClient(dbUrl);
    const db = dbClient.db('clean_harbours');

    const users = db.collection('users');

    const userInDb = await users.findOne({ username });

    if (!userInDb) {
      res.status(401).json({ message: 'Incorrect credentials' })
      return;
    }

    if (!bcrypt.compareSync(password, userInDb.password)) {
      res.status(401).json({ message: 'Incorrect credentials' })
      return;
    }

    res.status(200).json({
      username,
    })


  } catch (err) {
    console.log('Error occured: ', err);
    res.status(500);
  } finally {
    dbClient.close();
  }
}

module.exports = {
  signup,
  login,
}