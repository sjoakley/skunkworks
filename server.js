// Set NODE_ENV to production if not explicitly set.
if (!process.env['NODE_ENV']) {
  process.env['NODE_ENV'] = 'production';
  console.log('NODE_ENV = %s', process.env['NODE_ENV']);
}

var cluster = require('cluster');
var config = require('config').Server
var express = require('express'),
    expressValidator = require('express-validator');
var util = require('util');

var ping = require('./routes/ping');

// Setup the express application and corresponding routes.
var app = express();

app.configure(function () {
    app.use(express.compress()); // Enable gzip compression.
    app.use(expressValidator);
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(app.router);
});

// Enable static content serving.
app.use('/', express.static(__dirname + '/static'));

app.get('/ping', ping.healthCheck);

app.listen(config.port);
console.log('Listening on %d...', config.port)
