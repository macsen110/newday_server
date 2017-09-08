var showGoodsDetailModel = require('../models/showGoodsDetailModel');
exports.show = async function (req, res) {
	var obj = await showGoodsDetailModel.show(req.params.id);
	res.json(obj)
}