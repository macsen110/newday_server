module.exports = {
  "appenders": {
    "access": {
      "type": "dateFile",
      "filename": "_logs/access.log",
      "pattern": "-yyyy-MM-dd",
      "category": "http"
    },
    "app": {
      "type": "file",
      "filename": "_logs/app.log",
      "maxLogSize": 10485760,
      "numBackups": 3
    },
    "errorFile": {
      "type": "file",
      "filename": "_logs/errors.log"
    },
    "errors": {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": "errorFile"
    }
  },
  "categories": {
    "default": { "appenders": ["app", "errors"], "level": "DEBUG" },
    "http": { "appenders": ["access"], "level": "DEBUG" }
  }
}