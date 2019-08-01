var express = require('express');
var router = express.Router();
var saveVedioLogController = require('../controllers/saveVedioLogController');
router.get('/', saveVedioLogController.save)


module.exports = router;