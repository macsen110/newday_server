var myModel = require('./videoModelConnection');
var countMsg = 0;
var execSuc = (task, item) => {
	var obj = {};
	if (item.length) {
		obj.code = 1;
		obj.msg = '用户名已存在,请换一个';
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
	obj.msg = '恭喜您, 注册成功';
	obj.isLogin = 1;
	obj.user = res.name;
	return obj
}

var saveErr = (err) => {
	var obj = {};
	obj.code = 1;
	obj.msg = '存储失败,请稍后再试';
	return obj;
}

var updateSuc = (res) => {
	var obj = {};
	obj.code = 0;
	obj.msg = '更新成功';
	obj.isLogin = 1;
	obj.user = res.name;
	return obj
}

var updateErr = (err) => {
	var obj = {};
	obj.code = 1;
	obj.msg = '更新失败';
	return obj;
}

module.exports = {
  save: function (count, time, type) {
    console.log('type: ', type)
    if (type === 'recieve') {
      console.log('recieve')
      return  myModel
        .update({count : count}, {$set : {revieve_time : time}})
        .then(updateSuc).catch(updateErr)
    }
    if (type === 'p_connect') {
      console.log('p_connect')
      return myModel
      .update({count : count}, {$set : {p_connect_time : time}})
      .then(updateSuc).catch(updateErr)
    }
    if (type === 'm_connect') {
      console.log('m_connect')
      return myModel
      .update({count : count}, {$set : {m_connect_time : time}})
      .then(updateSuc).catch(updateErr)
    }
    if (type === 'm_start') {
      console.log('m_start')
      return myModel
      .update({count : count}, {$set : {m_start_time : time}})
      .then(updateSuc).catch(updateErr)
    }
    return myModel
      .find({count: count})
      .limit(10)
			.exec()
			.then(execSuc.bind(null, new myModel({ 
        count: +count, 
        start_time: time, 
        revieve_time: '',
        p_connect_time: '',
        m_connect_time: ''
      })))
			.catch(execFaild)		
    
  }
}