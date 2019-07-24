var log4js = require('log4js');
var logcongif = require('./config/logconfig')
log4js.configure(logcongif);
module.exports = log4js