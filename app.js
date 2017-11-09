var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Agoge node functions
var anf = require('agoge-node-functions');
Object.assign(global, anf);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./psql.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//http://stackoverflow.com/questions/35550855/best-way-to-handle-exception-globally-in-node-js-with-express-4
process.on('unhandledRejection', function(err, p){ console.log(`unhandledRejection \n  ${Object.prototype.toString.call(err)}\n  ${stringifyError(err)}\n\n`)});
process.on('uncaughtException', function(err, p){ console.log(`uncaughtException \n  ${Object.prototype.toString.call(err)}\n  ${stringifyError(err)}\n\n`)});

module.exports = app;
