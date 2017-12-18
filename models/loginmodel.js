var myModel = require('./userModelConnection');
var execSuc = (item) => {
	var obj = {};
	if (item.length) {
		obj.code = 0;
		obj.msg = 'ok';
		obj.isLogin = 1;
		obj.user = item[0].name;
	}
	else {
		obj.code = 1;
		obj.msg = 'no users,';				
	}
	return obj;
}
var execFaild = (err) => {
	var obj = {};
	obj.code = 1;
	obj.msg = 'exec go wrong';
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
