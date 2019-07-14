var express = require('express');
var app = express();
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var settings = require('./config/settings'); 
require("node-jsx").install();
require('./chat.js')(server);
var routes = require('./routes/index')(app);
var users = require('./routes/users');
var goods = require('./routes/goods');
var imAvLogs = require('./routes/im_av_log');
var comments = require('./routes/comments');
var mch = require('./routes/mch');
var git  = require('./routes/git')
var testvideo = require('./routes/testvideo')
var wx_lites = require('./routes/wx_lites')
var cluster = require('cluster');
var schedule = require('node-schedule');
var token = require('./wx/token')

mongoose.Promise = global.Promise;
// Connect to mongodb
var connect = function () {
  console.log('start connecting');
  var options = { 
    useMongoClient: true 
  };
  mongoose.connect('mongodb://'+ settings.db.host+'/' + settings.db.dbname, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('connected', function () {
  console.log('connected')
})





app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile); 





var sess = {
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard',
  rolling: true,
  cookie: {
    maxAge:1000 * 60 * 10
  },
};

app.use(cookieParser());
app.use(session(sess));

app.use(function(req, res, next) {  

  //console.log(req.cookies)
  var ua = req.headers["user-agent"] + "@HTML5";
  res.locals.config = {
      version: "20150917",
      ua: ua,
      platform: ua.match(/iphone|ipad|ipod|android|windows|linux|unix|mac|HTML5/i).toString(),
      isWeixin: !!/micromessenger/gi.test(ua),
      wxConfig: null,
      url: [req.protocol, "://", req.headers.host, req.originalUrl].join(""),
      baseUrl:[req.protocol, "://", req.headers.host].join(""),
      _debug: !!/debug/gi.test(req.originalUrl),
  };
  //res.setHeader('Cache-Control', 'max-age=0')
  //res.setHeader('Etag', 'qa133311')
  next();
})



app.use(function(req, res, next) {
  next()
})
 
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/api', routes);
app.use('/api/testvideo', testvideo);
app.use('/api/users', users);
app.use('/api/goods', goods);
app.use('/api/comments', comments);
app.use('/api/wx_lites', wx_lites)
app.use('/api/im_av', imAvLogs)
app.use('/api/infanthospital/v1', mch);
app.use('/api/socket4git', git)
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/tmp', express.static(__dirname + '/tmp'));
app.use(express.static(path.join(__dirname, 'public')));
token.reflushToken()
schedule.scheduleJob('*/30 * * * *', function(){
  token.reflushToken()
});

// const webPush = require('web-push');

// const pushSubscription = {
//   "endpoint":"https://fcm.googleapis.com/fcm/send/ed12RduSDc4:APA91bHo-1lv42jtgdPMGnpIT18vk2Lvz9HtCkCaEaHLOvnNHHWqdsvZuFCyaFZenoDn2X4Y8szLp6tlxldusj-eGLzgMswjZ21yzDdBKZoZN1g5R1wz6AadYV6yH4O_w-fR_sbwFCFx",
//   "expirationTime":null,
//   "keys":{"p256dh":"BNiwMsOZYlTGVUwiEBwuPS2LUxg8SpE49R0VWT3L7h5gHXHhdNGwZCCUNZOmrYDYaxw53n01J3WuJavHAHCBiV8","auth":"DOtvEBeFHvhcPVgbR8vblA"}
// };

// // TODO 4.3a - include VAPID keys

// const payload = 'Here is a payload!';

// const options = {
//   //gcmAPIKey: 'sOdpiaDympjIvLVPuMTH-T4lh4npk8erYrDs4IjXzpA',
//   TTL: 60,

//   // TODO 4.3b - add VAPID details

// };
// try {
//   webPush.setVapidDetails(
//     'mailto:839945193@qq.com',
//     'BKHC0w2c7ml3tjiqgYd27jUCrEKqhzZ3p5-Uhne7Y-HPjadkOo5nWnUNC72lxPlQGgB3yMKHZXC3RyFA6wlR5DE',
//     'sOdpiaDympjIvLVPuMTH-T4lh4npk8erYrDs4IjXzpA'
//   );
  
//   webPush.sendNotification(
//     pushSubscription,
//     payload,
//     options
//   ).catch(e => console.log(e));
// }
// catch (e) {
//   console.log(e)
// }


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
var port;
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    next()
  });
  port = 3000
}

else {
// production error handler
// no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
    next()
  });
  port = 80
}
if (cluster.isMaster) {
  console.log('master')
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}
else {
  console.log('cluster')
  server.listen(3000);
}
//server.listen(3000);
module.exports = app;

