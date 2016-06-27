const winston = require('winston');
const formatter = require('util').format;


winston.setLevels(winston.config.npm.levels);
winston.addColors(winston.config.npm.colors);

const logger = new ( winston.Logger )({
    transports: [
        new winston.transports.Console({
            level: 'warn', // Only write logs of warn level or higher
            colorize: true,
            formatter: formatter
        })
    ]
});

module.exports = logger;