import { setTimeout } from 'timers';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
console.log(process.env.NODE_ENV + ' env123456')
const execSync = require('child_process').execSync;
const syncPathClient = process.env.NODE_ENV === 'production' ? '/home/www/newday_client' : '/Users/macsen/Desktop/Macsen/newday_client'
const syncPathServer = process.env.NODE_ENV === 'production' ? '/home/www/newday_server' : '/Users/macsen/Desktop/Macsen/newday_server'
const config = {
  path: {
    client: syncPathClient,
    server: syncPathServer
  },
  gitCommand: 'git pull'
}
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post('/', (req, res)=> updateByShell(req, res))
function updateByShell (req, res) {
  let repository = req.body.repository.name;
  //开始执行自动更新脚本
  let command = '';
  if (repository === 'newday_client') command = "cd "+config.path.client+" && " + config.gitCommand
  if (repository === 'newday_server') command = "cd "+config.path.server+" && " + config.gitCommand +" && pm2 restart app.js"
  console.log(command)
  res.end('hello, 1111')
  setTimeout(() => {
    let stdout = execSync(command);
    console.log(stdout)
  }, 2000)
  
  //console.log(111)
}

module.exports = router;
