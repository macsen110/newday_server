var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var fs = require('fs');
var path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dirpath = 'resource/zone/' + path.extname(file.originalname).slice(1);
    mkdirsSync(dirpath); 
    cb(null, dirpath) 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
});
var upload = multer({ storage: storage, length: 200 });
var saveGoodsController = require('../controllers/saveGoodsController');
var showGoodsController = require('../controllers/showGoodsListController');
var showDetailController = require('../controllers/showGoodsDetailController');
var deleteGoodsController = require('../controllers/deleteGoodsController'); 

function mkdirsSync(dirpath) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        path.normalize(dirpath).split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp)) {
                    return false;
                }
            }
        });
    }

   return true; 
}
router.use(bodyParser.urlencoded({ 
    limit: '50mb', 
    extended: true
}));
router.get('/list', showGoodsController.show)
router.post('/upload', upload.array('pics',10), saveGoodsController.save)
router.get('/detail/:id', showDetailController.show)
router.delete('/delete/:id', function (req, res) {
    deleteGoodsController(req.params.id, res)
})
module.exports = router;
