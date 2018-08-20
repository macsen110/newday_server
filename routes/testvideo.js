var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var router = express.Router();
var saveVedioLogController = require('../controllers/saveVedioLogController');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(function (req, res, next) {
  next()
})


router.get('/', saveVedioLogController.save)


module.exports = router;