var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var router = express.Router();
var saveUserController = require('../controllers/saveUserController');
var validUserController = require('../controllers/validUserController');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(function (req, res, next) {
  next()
})
router.post('/saveuser', saveUserController.save)

router.post('/validuser', validUserController.valid)

router.get('/logout', function (req, res) {
  req.session.destroy(function(err) {
    if (!err) res.json({code: 0})
  // cannot access session here
  })
})



module.exports = router;
