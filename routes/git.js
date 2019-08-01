var express = require('express');
var router = express.Router();
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
router.post('/', (req, res)=> updateByShell(req, res))
function updateByShell (req, res) {
  let repository = req.body.repository.name;
  //开始执行自动更新脚本
  let command = '';
  if (repository === 'newday_client') command = "cd "+config.path.client+" && " + config.gitCommand
  if (repository === 'newday_server') command = "cd "+config.path.server+" && " + config.gitCommand +" && pm2 restart app.js"
  res.end('hello s eee, 1111')
  execSync(command);
}

module.exports = router;
