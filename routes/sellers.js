var express = require('express');
var router = express.Router();
//var userController = require('../controllers/usercontroller')



// define the home page route
router.get('/*',function(req,res,next){
  next()
  if (req.method === 'GET') {

    res.render(req.originalUrl.slice(1), {
      //title: app.title
    });
 }

});

router.get('/register', function (req, res, next) {
  res.locals.title = 'register';
})

router.get('/login', function (req, res, next) {

})

router.get('/upload', function (req, res, next) {
   
  // next()
})
router.post('/saveuser', function (req, res) {
  //userController.save(req, res);
  
})
module.exports = router;
