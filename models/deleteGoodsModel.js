var myModel = require('./goodsModelConnection');
module.exports = function (goodsid) {
	return myModel
		.remove({_id: goodsid})
		.then(item => {return {code: 0}})
		.catch(err => { return {code: 1} })
}