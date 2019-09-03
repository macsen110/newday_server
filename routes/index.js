var express = require("express");
var router = express.Router();
var log4js = require('../log')
var _log = log4js.getLogger("http")
var redisConfig = require('../config/redis')
var fs = require('fs')
var path = require('path')
function resolveAfter2Seconds(user, sessionID) {
  console.log('sessionID: ', sessionID)
  return new Promise(resolve => {
    setTimeout(() => {
      if (user) return resolve(user);
      redisConfig.client.get('sess:' + sessionID, function (err, replies) {
        console.log(" replies: " + replies);
        resolve(replies)
      });
    }, 0);
  });
}
module.exports = function(app) {
  router.use("/MP_verify_QN72brFHSLX0PSjp.txt", (req, res) => {
    res.set('Content-Type', 'text/plain')
    var content = fs.readFileSync(path.join(__dirname, 'MP_verify_QN72brFHSLX0PSjp.txt'), "utf8")
    res.send(content)
  })
  router.use("/home", async (req, res, next) => {
    var a = await resolveAfter2Seconds(req.session.user, req.sessionID);
    _log.error("Something went wrong:", JSON.stringify({
      code: 0,
      isLogin: a ? true : false,
      user: a
    }));
    res.json({
      code: 0,
      isLogin: a ? true : false,
      user: a
    });
  });
  router.use("/oauth2", (req, res) => {
    var _query = req.query
    var _location = decodeURIComponent(_query.redirect_url)
    var _code = _query.code;
    var _seq =  _location.indexOf('?') !== -1 ? '&' : "?"
    res.redirect(_location + _seq +  'code='+_code)
    
  })
  return router;
};
