
var mongoose = require('mongoose');
var Schema = new mongoose.Schema({ 
	title: String,
 	category: String,
 	content: String,
 	files: Array, 
	 _id: Number,
	 user: String,
	 _time: Number,
	 comment_count: Number
});
module.exports = mongoose.model('goods',Schema);

 