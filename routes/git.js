var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
router.post('/', (req, res)=> updateByShell(req, res))
function updateByShell (req, res) {
  console.log(111)
  res.end('hello, shelljs')
}

module.exports = router;