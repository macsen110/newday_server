const path = require('path')
module.exports = {
  apps: [{
    name: 'app',
    script: './app.js',
    instances: 1,
    autorestart: true,
    watch: false,
    out_file: "_logs/pm2-app-out.log",
    error_file: "_logs/pm2-app-err.log",
    log_date_format: "YYYY-MM-DD HH:mm Z",
    //combine_logs: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};

