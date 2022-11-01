const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const { dbUrl } = require('../config/db');

const dbClient = new MongoClient(dbUrl);

async function signup(req, res) {
  const { username, password } = req.body;

  try {
    const db = dbClient.db('clean_harbours');
    const users = db.collection('users');

    const userInDb = await users.findOne({ username });

    if (userInDb) {
      res.status(403).json({ message: 'User already registered' });
      return;
    }

    const { acknowledged } = await users.insertOne({
      username,
      password: bcrypt.hashSync(password, 10),
    })

    if (acknowledged) {
      res.status(201).json({ username });
    }

  } catch (err) {
    console.log('Error occured: ', err);
    res.status(500);
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
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
  }
}

module.exports = {
  signup,
  login,
}