// @ts-ignore
let createError = require('http-errors');
// @ts-ignore
let express = require('express');
// @ts-ignore
let path = require('path');
// @ts-ignore
let cookieParser = require('cookie-parser');
// @ts-ignore
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
// @ts-ignore
app.set('views', path.join(__dirname, 'views'));
// @ts-ignore
app.set('view engine', 'pug');

// @ts-ignore
app.use(logger('dev'));
// @ts-ignore
app.use(express.json());
// @ts-ignore
app.use(express.urlencoded({ extended: false }));
// @ts-ignore
app.use(cookieParser());
// @ts-ignore
app.use(express.static(path.join(__dirname, 'public')));

// @ts-ignore
app.use('/', indexRouter);
// @ts-ignore
app.use('/api/v1/users', usersRouter);

// catch 404 and forward to error handler
// @ts-ignore
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// @ts-ignore
// @ts-ignore
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
