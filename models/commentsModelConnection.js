var mongoose = require('mongoose');
var Schema = new mongoose.Schema({ 
	_id: Number, 
	C_content: String,
	C_goodid: Number,
	C_user: String
});
module.exports = mongoose.model('commets',Schema);
