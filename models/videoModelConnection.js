var mongoose = require('mongoose');
var Schema = new mongoose.Schema({ 
	count: String,
  start_time: String,
  revieve_time: String,
  p_connect_time: String,
  m_connect_time: String,
  m_start_time: String

});
module.exports =  mongoose.model('video', Schema);
