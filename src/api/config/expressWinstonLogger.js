const { format, transports } = require('winston');
const expressWinston = require('express-winston');

const apiLogger = expressWinston.logger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [new transports.Console()],
});

module.exports = apiLogger;
