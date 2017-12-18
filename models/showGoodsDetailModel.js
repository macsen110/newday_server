var async = require('async');
var myModel = require('./goodsModelConnection');
var CmyModel = require('./commentsModelConnection');
exports.show = async function (goodsid) {
	var parallel = {
		detail: function () {
			return myModel
				.findOne({_id: goodsid})
				.exec()
				.then(item => {
					return {
						title: item.title,
						category: item.category,
						content: item.content,
						files: item.files,
						id: item._id,
						user: item.user
					}
				});
		},
		commets: function (callback) {
			return CmyModel
				.find({C_goodid: goodsid}, {C_content: 1, C_goodsid: 1, C_user: 1})
				.exec()
				.then()
				.catch()
		}
	}
	
	return Promise.all([parallel.detail(), parallel.commets()])
					.then(items => {return {detail: items[0], commets: items[1]}})
					.catch()
	
	
}