const createError = require('http-errors');

const express = require('express');
const app = express()
require('dotenv').config();
const port = process.env.PORT ?? 3001

// require('./helpers/connection_mongodb');
require('./helpers/db.connect')();

const client = require('./helpers/connection_redis');

const UserRoute = require('./routes/user.route');

//read json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
  res.send('Home page!')
});

app.use("/user", UserRoute);

//middleware - error handle
app.use((req, res, next) => {
  //use 'http-errors'
  next(createError.NotFound('This route does not exist'));
});

//catch error
app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message
  })
})



app.listen(port, () => console.log(`This app listening on port ${port}!`))