var myModel = require('./goodsModelConnection');

var path = require('path');
var execCbSuc = (item) => {
	var obj = {}
	if (item.length) {
		var goodsArr = item.map(function (picobj) {
			if (picobj.files.length) {
				var picobjItem = picobj.files[0];
				if (picobj.category === 'image') {
					return {
						title: picobj.title,
						path: picobjItem.path.replace(/\\/g, '/'),
						category: picobj.category,
						height: picobjItem.height,
						width:  picobjItem.width,
						id: picobj._id + '_' + picobjItem.id,
						goodsid: picobj._id,
						user: picobj.user,
						_time: picobj._time,
						content: picobj.content,
						comment_count: picobj.comment_count
					};	
				}
				else {
					return {
						title: picobj.title,
						path: picobjItem.path.replace(/\\/g, '/'),
						category: picobj.category,
						id: picobj._id + '_' + picobjItem.id,
						goodsid: picobj._id,
						user: picobj.user,
						_time: picobj._time,
						content: picobj.content,
						comment_count: picobj.comment_count
					};
				}
			}
			else {
				return {
					title: picobj.title,
					category: picobj.category,
					id: picobj._id,
					goodsid: picobj._id,
					content: picobj.content,
					user: picobj.user,
					_time: picobj._time,
					comment_count: picobj.comment_count
				}
			}						
		})
		obj.code = 0;
		obj.data = goodsArr;
		return obj;
	}
	obj.code = 1
	obj.msg = 'sorry, no results';
	obj.data = [];
	return obj;				
}
var execCbFail = (err, resCb) => {
	var obj = {}
	obj.code = 1
	obj.msg = 'sorry, something go wrong';
	return obj
}
exports.show = function (resCb) {
	var paths = [];
	return myModel
		.find({})
		.sort({_id: -1})
		.exec()
		.then(res => execCbSuc(res))
		.catch(err => execCbFail(err))

}