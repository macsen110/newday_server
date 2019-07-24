// 初始化示例
const tcb = require('tcb-admin-node');
const _config = require('../config/tcb')
// 初始化资源
// 云函数下不需要secretId和secretKey。
// env如果不指定将使用默认环境
tcb.init(_config);
const auth = tcb.auth();
const {
  openId, //微信openId
  appId, //微信应用appId
  uid //云开发用户唯一ID
} = auth.getUserInfo()
//promise
exports.tcbCallFun = (req, res) => {
    tcb.callFunction({
      name: "login",
      data: { a: 1 }
    })
    .then((_res) => {
      res.json(_res)
    })
    .catch(err => console.log(err));
}

