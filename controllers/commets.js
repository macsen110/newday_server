var commetModel = require('../models/comments');
module.exports = {
	save: async function (req, res) {
		var goodsid = req.body.goodsid;
		var content = req.body.comment;
		var obj = await commetModel.save(goodsid, content, req.session.user)
		res.json(obj)
	},
	deleteCommet: async function (req, res) {
		var obj = await commetModel.deleteCommet(req.params.goodsId, req.params.id)
		res.json(obj)
	}
};