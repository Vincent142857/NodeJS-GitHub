const mongoose = require('mongoose');
require('dotenv').config()

const conn = mongoose.createConnection("mongodb://localhost:2718/test", {
  useNewUrlParser: true,
});

conn.on('connected', function () {
  console.log(`\nMongodb::: connected:::${this.name}`);
});

conn.on('disconnected', function () {
  console.log(`\nMongodb::: disconnected:::${this.name}`);
});

conn.on('error', function () {
  console.log(`\nMongodb::: error:::${JSON.stringify(error)}`);
});

conn.on('open', function () {
  console.log('\nMongoose default connection is open')
});

process.on('SIGINT', async () => {
  await conn.close();
  process.exit(0);
});

module.exports = conn;