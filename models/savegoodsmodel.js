var gm = require('gm');
var events= require('events');
var emitter= new events.EventEmitter();
var myModel = require('./goodsModelConnection');				
var execSuc = (targetCollection, doc, item) => {
	let seq = (item && item.length) ? item[0]._id + 1  : 1;
	doc._id = seq;
	doc._time = Date.now();
	doc.comment_count = 0;
	var task = new targetCollection(doc);
	return task.save().then(saveSuc).catch(saveErr)
}
var execFaild = (err) => {
	var obj = {};
	obj.code = 1;
	obj.msg = '上传失败,请稍后再试';
	return obj;
}
var saveSuc = () => {
	var obj = {};
	obj.code = 0;
	obj.msg = '上传成功!';
	return obj
}

var saveErr = (err) => {
	console.log(err)
	return {
		err: err
	}
}

function insertDocument(doc, targetCollection) {
		return targetCollection
			.find({}, {_id: 1})
			.limit(1)
			.sort( { _id: -1 } )
			.exec()
			.then(execSuc.bind(null, targetCollection, doc))
			.catch(execFaild)
}

module.exports = {
	save: function (title, category, content, files, user) {	
		var doc = {
			title: title, 
			category: category, 
			content: content, 
			files: files,
			user: user
		}
		return insertDocument(doc,myModel)				
	}
}

