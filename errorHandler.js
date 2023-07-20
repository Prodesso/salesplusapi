
module.exports = () => {
  const dbUrl = 'mongodb+srv://devprodesso:devapp.CRM2022@prodessosystems.o5ljv.mongodb.net/CRMPRODSCKT?retryWrites=true&w=majority'
  var winston = require('winston');
  require('winston-mongodb');
  const logger = winston.createLogger({
    level: 'silly',
    format: winston.format.json()
  });
  logger.add(new winston.transports.MongoDB({ db: dbUrl }));

  process.on('unhandledRejection', (reason, p) => {
    logger.error(`Unhandled Rejection at Promise: ${reason} ${p}`)
  }).on('uncaughtException', (err, origin) => {
    logger.error(`Uncaught Exception thrown: ${err}`)
  }).on('multipleResolves', (type, promise, reason) => {
    logger.error(`multipleResolves: ${type} ${promise} ${reason}`)
  }).on('rejectionHandled', (promise) => {
    logger.error(`rejectionHandled: ${promise}`)
  })
  process.on('warning', (warning) => {
    logger.warn(`warning: ${warning}`)
  });
}