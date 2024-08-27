const mongoose = require('mongoose');
require('dotenv').config()

function newConnection(url) {
  console.log(`url ::`, url);
  const db = mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  db.on("error", function (err) {
    console.error(`Mongodb :: connection ${this.name} ${JSON.stringify(err)}`);
    db.close().catch(() => console.log(`Mongodb::fails to close connection ${this.name}`))
  })

  db.on('connection', function () {
    mongoose.set('debug', function (col, method, query, doc) {
      console.log(`Mongodb debug:: ${this.conn.name}::${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
      console.log(`Mongodb:: connected ${this.name}`);
    })
  })

  db.on('disconnected', function () {
    console.log(`Mongodb:: disconnected ${this.name} ${JSON.stringify(err)}`);
  });

  return db;
}

const { MONGO_DB_URL, STUDENT_TEST_URL, SOCIAL_URL } = process.env;
const jwtDB = newConnection(STUDENT_URL);
const student_TestDB = newConnection(STUDENT_TEST_URL);
const socialDB = newConnection(SOCIAL_URL);

module.exports = {
  jwtDB,
  socialDB,
  student_TestDB
}