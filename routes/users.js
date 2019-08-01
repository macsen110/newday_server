var express = require('express');
var router = express.Router();
var saveUserController = require('../controllers/saveUserController');
var validUserController = require('../controllers/validUserController');
router.post('/saveuser', saveUserController.save)
router.post('/validuser', validUserController.valid)
router.get('/logout', function (req, res) {
  req.session.destroy(function(err) {
    if (!err) res.json({code: 0})
  // cannot access session here
  })
})



module.exports = router;
