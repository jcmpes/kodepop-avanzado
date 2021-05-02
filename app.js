var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// db connector
// Import the mongoose module
require('./lib/connectMongoose')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * i18n Setup
 */
const i18n = require('./lib/i18nConfig');
app.use(i18n.init);

/**
 * WEB Routes
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/change-locale', require('./routes/change-locale'));

/**
 * API Routes
 */
app.use('/api/authenticate', require('./routes/api/authenticate'))
app.use('/api/anuncios', require('./routes/api/ads'));
app.use('/api/tags', require('./routes/api/tags'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error', err)
  res.json({ result: "error", code: err.status, error: err });
});

module.exports = app;
