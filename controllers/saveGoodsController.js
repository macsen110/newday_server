var util = require('util');
var saveGoodsModel = require('../models/savegoodsmodel');
var gm = require('gm');
module.exports = {
	save: async function(req, res) {
		var result = {};
		var paths = []
		var title = req.body.title;
		var category = req.body.category;
		var files = util.isArray(req.files) ? req.files : [req.files];
		var content = req.body.content;
		if (!title && title === '') {
			result = {
				code: 1,
				msg: 'title can not be empty'
			}
			return res.json(result);
		}

		if (!files.length && category !== 'note') {
			result = {
				code: 1,
				msg: 'please upload goods'
			}
			return res.json(result);
		}
		var obj;
		if (category === 'image') {
			var pro = function (files) {
				return new Promise((res, rej) => {
					files.forEach((item, index) => {
						gm(item.path).size((err, size) =>  {
								if (err) return 0;
								var pathItem = {};
								pathItem.width = size.width;
								pathItem.height = size.height;
								pathItem.path = item.path;
								pathItem.id = 'item_' + index;
								paths.push(pathItem);				  	
								if (paths.length === files.length) res(saveGoodsModel.save(title, category, content, paths))
						})
					})
				})
			}
			obj = await pro(files);
			
		}
		else if (category === 'video') {
			files.forEach(function (item, index) {
				paths.push({
					path: item.path
				})		
			})
			obj = await saveGoodsModel.save(title, category, content, paths)
			
		}
		else if (category === 'note') var obj = await saveGoodsModel.save(title, category, content, paths);
		res.json(obj)
	}
}
