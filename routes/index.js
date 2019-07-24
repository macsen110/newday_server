var log4js = require('../log')
var _log = log4js.getLogger("http")
module.exports = function(app) {
  var express = require("express");
  var router = express.Router();
  function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 0);
    });
  }
  router.use("/home", async (req, res, next) => {
    var a = await resolveAfter2Seconds(req.session.user);
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
    // res.json({
    // 	url: 'https://www.macsen318.com/zip/electron-quick-start-10.0.0-mac.zip'
    // });
  });
  return router;
};
