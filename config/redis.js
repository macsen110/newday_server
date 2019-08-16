var redis = require("redis")
var redisClient = redis.createClient();
module.exports = {
  client: redisClient,
  host: 'localhost',
  port: '6379',
  ttl: 1000 * 10
}