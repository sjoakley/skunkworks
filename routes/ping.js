var async = require('async');
var config = require('config').Server
var needle = require('needle');
var uuid = require('uuid');

exports.healthCheck = function(req, res) {
  res.send(200, {
    requestId: uuid.v4()
  });
};
