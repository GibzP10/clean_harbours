const { MongoClient } = require('mongodb');
const { DB_URL } = process.env;

module.exports.default = {
  dbClient: new MongoClient(DB_URL),
}
