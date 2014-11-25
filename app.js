var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var routes = require('./routes/index');
var login = require('./routes/login');

var app = express();

//DB
var levelup = require('levelup')

// open a data store
var db = levelup('/tmp/dprk.db')


  // a Batch operation made up of 3 Puts
  db.batch([
     { type: 'put', key: 'username', value: 'username' },
     { type: 'put', key: 'password', value: 'password' }
  ], function (err) {

    // read the whole store as a stream and print each entry to stdout
    db.createReadStream()
      .on('data', console.log)
      .on('close', function () {
        db.close()
      })
  })


app.use(session({
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000
  },
  secret: 'azerty123'
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/login', login);

app.get('/logout', function(req, res) {
  // delete the session variable
  delete req.session.username;
  // redirect user to homepage
  res.redirect('/');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
