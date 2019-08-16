var express = require("express");
var router = express.Router();
var log4js = require('../log')
var _log = log4js.getLogger("http")
var redisConfig = require('../config/redis')
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
  return router;
};
