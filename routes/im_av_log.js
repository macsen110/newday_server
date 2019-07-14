var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(function (req, res, next) {
  next()
})
router.post('/log', function (req, res) {
  console.log(req.body)
  res.json({code: 0})
})
module.exports  = router
