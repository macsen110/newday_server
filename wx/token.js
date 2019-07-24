
var token = 0
var request = require('request')
var appid = 'wxc1f2ef3541db6f95'
var secret = '491aa6f5f86676820eda759049d23619'
var api = 'https://api.weixin.qq.com/cgi-bin/token'
exports.getToken = () => {
  return token;
}
exports.reflushToken = () => {
  request.get(api + '?grant_type=client_credential&appid='+appid+'&secret='+secret, (err, res, body) => {
    token = JSON.parse(body).access_token
  })
}
exports.token = token;