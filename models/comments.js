var myModel = require('./commentsModelConnection');
var goodsModel = require('./goodsModelConnection');
module.exports = {
	save: function(goodsid, comment, user) {
		var obj = {};
		var _id = Date.now();
		var task = new myModel({
			_id: _id,
			C_content: comment, 
			C_goodid: goodsid,
			C_user: user
		});
		goodsModel
		.find({_id: goodsid})
		.update({_id : goodsid}, {$inc : {comment_count : 1}})
		return task.save()
			.then((res) => {
				obj.code = 0;
				obj.commet = res.C_content;
				obj._id = res._id;
				obj.C_user = res.C_user
				return obj;
			})
			.catch((reason) => {
					obj.code = 1;
					obj.msg = 'save go wrong';
					return obj;
				}
			)

	},
	deleteCommet: function (id) {
		var obj = {};
		goodsModel.update({_id : goodsid}, {$inc : {comment_count : -1}})
		return myModel.remove({_id: id})
			.then(res => {return {code: 0}})
			.catch(err => {return { code: 1 }})		
	}
}