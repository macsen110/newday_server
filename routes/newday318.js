var express = require("express");
var router = express.Router();
router.use("/periodic", async (req, res, next) => {
  return res.json({
    code: 0,
    path: 'periodic'
  });
});
router.use("/pre", (req, res) => {
  return res.json({
    code: 0,
    path: 'pre'
  });
  
})
module.exports =  router;
