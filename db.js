const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'MOVIES';

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;