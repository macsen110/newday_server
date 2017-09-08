var express = require('express');
var router = express.Router();
var commetController = require('../controllers/commets');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
// define the home page route
router.post('/', commetController.save)
router.delete('/:id', commetController.deleteCommet)
module.exports = router;
