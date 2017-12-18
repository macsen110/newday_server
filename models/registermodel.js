var myModel = require('./userModelConnection');
var execSuc = (task, item) => {
	var obj = {};
	if (item.length) {
		obj.code = 1;
		obj.msg = 'user has been exist';
		return obj;
	}
	return task.save().then(saveSuc).catch(saveErr)
}
var execFaild = (err) => {
	var obj = {};
	obj.code = 1;
	obj.msg = 'exec go wrong';
	return obj;
}
var saveSuc = (res) => {
	var obj = {};
	obj.code = 0;
	obj.msg = 'ok,';
	obj.isLogin = 1;
	obj.user = res.name;
	return obj
}

var saveErr = (err) => {
	var obj = {};
	obj.code = 1;
	obj.msg = 'save go wrong';
	return obj;
}

module.exports = {
	save: function (name, pwd) {
		return myModel
			.find({name: name}).limit(10)
			.exec()
			.then(execSuc.bind(null, new myModel({name: name, pwd: pwd})))
			.catch(execFaild)		
	}
}

