const winston = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const { Logger, transports } = winston;
const { DailyRotateFile, Console } = transports;

const logger = new Logger({
  transports: [
    new DailyRotateFile({
      name: 'info_log',
      filename: path.join(__dirname, '../../koa-logs/info.log'),
      datePattern:'yyyy-MM-dd',
      prepend: true,
      level: 'info'
    }),
    new DailyRotateFile({
      name: 'error_log',
      filename: path.join(__dirname, '../../koa-logs/error.log'),
      datePattern:'yyyy-MM-dd',
      prepend: true,
      level: 'error'
    }),
    new Console(),
  ]
});

module.exports = logger;