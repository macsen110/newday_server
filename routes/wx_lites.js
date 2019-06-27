var express = require('express');
var router = express.Router();
var token = require('../wx/token')
var request = require('request')
var api = 'https://api.weixin.qq.com/tcb/databasequery'
var _api = 'https://api.weixin.qq.com/tcb/invokecloudfunction'
var fileApi = 'https://api.weixin.qq.com/tcb/batchdownloadfile'
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
router.get('/fun', (req, res) => {
  request({
    method: "POST",
    url: _api,
    json: true,
    qs: {
      access_token: token.getToken(),
      env: "newday318-6e42j",
      name: 'sum'
    },
    body: {
      a: '2',
      c: 'f'
    }
  }, (_err, _res, _body) => res.json(_body))
})
router.get('/files', (req, res) => {
  request({
    method: "POST",
    url: fileApi,
    json: true,
    qs: {
      access_token: token.getToken(),
    },
    body: {
      env: "newday318-6e42j",
      file_list: [{
        fileid: 'cloud://newday318-6e42j.6e65-newday318-6e42j/my-image.jpg',
        max_age: 10
      }]
    },
  },(_err, _res, _body) => res.json(_body))
})
module.exports = router