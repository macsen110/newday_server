
var mongoose = require('mongoose');
var Schema = new mongoose.Schema({ 
	title: String,
 	category: String,
 	content: String,
 	files: Array, 
	 _id: Number,
	 user: String,
	 _time: Number
});
module.exports = mongoose.model('goods',Schema);

 