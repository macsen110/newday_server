const path = require('path')
module.exports = {
  apps: [{
    name: 'app',
    script: './app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    out_file: "_logs/app-out.log",
    error_file: "_logs/app-err.log",
    log_date_format: "YYYY-MM-DD HH:mm Z",
    combine_logs: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
