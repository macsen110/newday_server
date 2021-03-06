var express = require('express');
var app = express();
var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var mongoose = require('mongoose');
var settings = require('./config/settings');
var routes = require('./routes/index')(app);
var users = require('./routes/users');
var goods = require('./routes/goods');
var imAvLogs = require('./routes/im_av_log');
var comments = require('./routes/comments');
var mch = require('./routes/mch');
var git = require('./routes/git')
var testvideo = require('./routes/testvideo')
var wx_lites = require('./routes/wx_lites')
var newday318 = require('./routes/newday318')
//var cluster = require('cluster');
var schedule = require('node-schedule');
var token = require('./wx/token')
var log4js = require('./log')
var redisConfig = require('./config/redis')
mongoose.Promise = global.Promise;
// Connect to mongodb
var connect = function () {
  console.log('start connecting');
  var options = {
    useMongoClient: true
  };
  mongoose.connect('mongodb://' + settings.db.host + '/' + settings.db.dbname, options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('connected', function () {
  console.log('connected')
})
token.reflushToken()
schedule.scheduleJob('*/30 * * * *', function () {
  token.reflushToken()
});

var sess = {
  name: 'JSESSIONID',
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard',
  rolling: true,
  cookie: {
    //maxAge: 1000 * 10 * 30
  },
  store: new RedisStore({ ...redisConfig })
};
app.use(log4js.connectLogger(log4js.getLogger("http"), {
  level: 'auto',
  nolog: '\\.gif|\\.jpg$',
  context: true,
  format: (req, res, format) => {
    return format(`:remote-addr :method :url ${JSON.stringify(req.body)} ${res.statusCode} :response-time `)
  }
}));

app.use('/tmp', express.static(__dirname + '/tmp'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session(sess));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function (req, res, next) {
  //console.log(req.cookies)
  var ua = req.headers["user-agent"] + "@HTML5";
  res.locals.config = {
    version: "20150917",
    ua: ua,
    platform: ua.match(/iphone|ipad|ipod|android|windows|linux|unix|mac|HTML5/i).toString(),
    isWeixin: !!/micromessenger/gi.test(ua),
    wxConfig: null,
    url: [req.protocol, "://", req.headers.host, req.originalUrl].join(""),
    baseUrl: [req.protocol, "://", req.headers.host].join(""),
    _debug: !!/debug/gi.test(req.originalUrl),
  };
  //res.setHeader('Cache-Control', 'max-age=0')
  //res.setHeader('Etag', 'qa133311')
  next();
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
app.use('/api/newday318', newday318)


var port;
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
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
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
    next()
  });
  port = 80
}
// if (cluster.isMaster) {
//   console.log('master')
//   const numCPUs = require('os').cpus().length;
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
// }
// else {
//   console.log('cluster')
//   server.listen(3000);
// }

server.listen(3000);
module.exports = app;

