var myModel = require('./goodsModelConnection');
var CmyModel = require('./commentsModelConnection');
module.exports = function (goodsid) {
	CmyModel
		.remove({C_goodid: goodsid})
		.then()
		.catch()
	return myModel
		.remove({_id: goodsid})
		.then(item => {return {code: 0}})
		.catch(err => { return {code: 1} })
}