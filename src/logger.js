const LOG_LEVEL_DEBUG = 'debug';
const LOG_LEVEL_INFO = 'info';
const LOG_LEVEL_WARN = 'warn';
const LOG_LEVEL_ERROR = 'error';
const LOG_LEVEL_FATAL = 'fatal';

const logLevelHierarchy = [
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_INFO,
  LOG_LEVEL_WARN,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_FATAL
];

const Logger = function(appId, version, logLevel) {
  this.appId = appId;
  this.version = version;
  this.logLevel = logLevel;

  if (typeof this.version === 'undefined') {
    this.version = '1.0.0';
  }

  if (typeof this.logLevel === 'undefined') {
    this.logLevel = LOG_LEVEL_INFO;
  }
};

Logger.prototype._transformMessage = function(message, level) {
  const baseMessage = {
    '@appId': this.appId,
    '@version': this.version,
    '@level': level
  };

  if (typeof message === 'string') {
    baseMessage.text = message;
  } else {
    Object.keys(message).forEach(function(key) {
      baseMessage[key] = message[key];
    });
  }

  return JSON.stringify(baseMessage);
};

logLevelHierarchy.forEach(function(logLevel) {
  Logger.prototype[logLevel] = function(message) {
    if (logLevelHierarchy.indexOf(this.logLevel) <= logLevelHierarchy.indexOf(logLevel)) {
      const transformedMessage = this._transformMessage(message, logLevel);
      switch (logLevel) {
        case LOG_LEVEL_DEBUG:
          console.log(transformedMessage);
          break;
        case LOG_LEVEL_FATAL:
          console.error(transformedMessage);
          break;
        default:
          console[logLevel](transformedMessage);
      }
    }
  }
});

Logger.LOG_LEVEL_DEBUG = LOG_LEVEL_DEBUG;
Logger.LOG_LEVEL_INFO = LOG_LEVEL_INFO;
Logger.LOG_LEVEL_WARN = LOG_LEVEL_WARN;
Logger.LOG_LEVEL_ERROR = LOG_LEVEL_ERROR;
Logger.LOG_LEVEL_FATAL = LOG_LEVEL_FATAL;

module.exports = Logger;
