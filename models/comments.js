var myModel = require('./commentsModelConnection');
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
		return myModel.remove({_id: id})
			.then(res => {return {code: 0}})
			.catch(err => {return { code: 1 }})		
	}
}