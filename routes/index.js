module.exports  = function(app) {
	var express = require('express');
	var router = express.Router();
	function resolveAfter2Seconds(x) {
  	return new Promise(resolve => {
			setTimeout(() => {
				resolve(x);
			}, 0);
		});
	}
	router.get('/home', async (req, res, next) => {
		var a = await resolveAfter2Seconds(req.session.user)
		res.json({
			code: 0,
			isLogin: a
		})
	})
	return router;
};
