var deleteGoodsModel = require('../models/deleteGoodsModel');
module.exports = async function (goodsid, res) {
	var obj = await deleteGoodsModel(goodsid)
	res.json(obj)
}