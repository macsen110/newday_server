var myModel = require('./userModelConnection');
var execSuc = (item) => {
	var obj = {};
	if (item.length) {
		obj.code = 0;
		obj.msg = '登录成功';
		obj.isLogin = 1;
		obj.user = item[0].name;
	}
	else {
		obj.code = 1;
		obj.msg = 'sorry, 没有查到此用户';				
	}
	return obj;
}
var execFaild = (err) => {
	var obj = {};
	obj.code = 1;
	obj.msg = '存储失败,请稍后再试';
	return obj;
}
module.exports = {
	valid: function (name, password) {
		return myModel
			.find({name: name})
			.exec()
			.then(execSuc)
			.catch(execFaild)
	}
};
