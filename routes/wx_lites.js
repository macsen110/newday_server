var express = require('express');
var router = express.Router();
var token = require('../wx/token')
var request = require('request')
var tcb = require('../wx/tcb')
var api = 'https://api.weixin.qq.com/tcb/databasequery'

router.get('/users', (req, res) => {
  request({
    json: true,
    body: {
      env: "newday318-6e42j",
      query: "db.collection('users').get()"
    },
    method: "POST",
    url: api,
    qs: {
      access_token: token.getToken()
    }
  }, (err, _res, body) => {
    res.json(body)
  })
})
router.get('/tcbCallFun', tcb.tcbCallFun)
module.exports = router