var usermodel = require('../models/loginmodel');
module.exports= {
	valid: async function(req, res) {
		var result = {};
		var username = req.body.username;
		var password = req.body.password;
		if (!username) {
			result = {
				code: 1,
				msg: '姓名不能为空'
			}
			return res.json(result);
		}
		if (!password) {
			result = {
				code: 1,
				msg: '密码不能为空'
			}
			return res.json(result);
		}
		var obj = await usermodel.valid(username, password);
		if (obj.code == 0) {
			req.session.maxAge = 60 * 1000 * 60;
			req.session.user = username
		}
		res.json(obj)
		
	}
}
