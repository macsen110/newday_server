var showGoodsmodel = require('../models/showGoodsListModel');
exports.show = async function (req, res) {
	var obj = await showGoodsmodel.show()
	res.json(obj)
} 