var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require('path');
function readJsonFileSync(filepath, encoding){
  if (typeof (encoding) == 'undefined') encoding = 'utf8';
  var file = fs.readFileSync(filepath, encoding);
  return JSON.parse(file);
}
function getConfig(file){
  var filepath = path.resolve(__dirname, '../mch/json/' + file+'.json')
  return readJsonFileSync(filepath);
}

//assume that config.json is in application root
router.post('/getCustomerInfo', (req, res) => res.json(getConfig('getCustomerInfo')))
router.get('/getToken', (req, res) => res.json(getConfig('token')));
router.post('/initCustomer', (req, res) => res.json(getConfig('initCustomer')));
router.post('/customerHistory', (req, res) => res.json(getConfig('customerHistory')))
router.post('/getBookInfo', (req, res) => res.json(getConfig('getBookInfo')))
router.post('/getBookInfoInterface', (req, res) => res.json(getConfig('getBookInfoInterface')))
router.post('/getAllReportList', (req, res) => res.json(getConfig('getAllReportList')))
router.post('/childFirstTime', (req, res) => res.json(getConfig('childFirstTime')))
router.post('/superApply', (req, res) => res.json(getConfig('superApply')))
router.post('/getChildInfo', (req, res) => res.json(getConfig('getChildInfo')))
router.post('/motherNote', (req, res) => res.json(getConfig('motherNote')))
router.post('/childInfo', (req, res) => res.json(getConfig('childInfo')))
router.post('/getReportListDetail', (req, res) => res.json(getConfig('getReportListDetail')))
router.post('/getQueueInfo', (req, res) => res.json(getConfig('getQueneInfo')))
module.exports = router;
