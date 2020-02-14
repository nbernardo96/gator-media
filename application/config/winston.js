'use strict';

/**
 * Created by Junaid Anwar on 5/28/15.
 */
var winston = require('winston');
var logger = winston.createLogger({
    level: 'verbose',
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: false,
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

// logger.add(winston.transports.Console, {
//     level: 'verbose',
//     prettyPrint: true,
//     colorize: true,
//     silent: false,
//     timestamp: false
// });

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = logger;
