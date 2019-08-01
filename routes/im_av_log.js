var express = require('express');
var router = express.Router();
router.post('/log', function (req, res) {
  res.json({code: 0})
})
module.exports  = router
