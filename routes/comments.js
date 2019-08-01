var express = require('express');
var router = express.Router();
var commetController = require('../controllers/commets');
var tools = require('../tools')
// define the home page route
router.post('/', tools.requireAuthentication, commetController.save)
router.delete('/:goodsId/:id', tools.requireAuthentication, commetController.deleteCommet)
module.exports = router;
