import winston from "winston";

class Logger {
  constructor({config}) {
    const serviceName = config.PROJECT.service|| "default";
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: { service: serviceName },
      transports: [
        new winston.transports.File({ filename: `${serviceName}.log` }),
      ],
    });
  }

  info(message, meta = {}) {
    this.logger.info(message, meta);
  }

  error(message, meta = {}) {
    this.logger.error(message, meta);
  }

  warn(message, meta = {}) {
    this.logger.warn(message, meta);
  }

  debug(message, meta = {}) {
    this.logger.debug(message, meta);
  }
}

export default Logger;
