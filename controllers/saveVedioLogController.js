var moment = require('moment');
var usermodel = require('../models/videomodel');
var saveUser = {
  save: async function (req, res) {
    var now = moment().format('YYYY-MM-DD HH:mm:ss')
    var obj = await usermodel.save(req.query.count, now, req.query.type)
    res.json(obj)
  }
}
module.exports = saveUser;