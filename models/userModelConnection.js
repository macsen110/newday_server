var mongoose = require('mongoose');
var Schema = new mongoose.Schema({ 
	name: String,
	pwd: String
});
module.exports =  mongoose.model('users', Schema);
