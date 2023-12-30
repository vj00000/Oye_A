const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const dbName = 'MOVIES';

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.uri);
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;