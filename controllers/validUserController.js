var usermodel = require('../models/loginmodel');
module.exports= {
	valid: async function(req, res) {
		var result = {};
		var username = req.body.username;
		var password = req.body.password;
		if (!username && username === '') {
			result = {
				code: 1,
				msg: 'user name can not be empty'
			}
			return res.json(result);
		}
		if (!password && password === '') {
			result = {
				code: 1,
				msg: 'password name can not be empty'
			}
			return res.json(result);
		}

		var obj = await usermodel.valid(username, password);
		if (obj.code == 0) req.session.user = username
		res.json(obj)
		
	}
}
