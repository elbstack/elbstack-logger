const objectValues = require('object.values');
const objectKeys = require('object-keys');

const LOG_LEVEL_DEBUG = 'debug';
const LOG_LEVEL_INFO = 'info';
const LOG_LEVEL_WARN = 'warn';
const LOG_LEVEL_ERROR = 'error';
const LOG_LEVEL_FATAL = 'fatal';

const TEXT_SEPARATOR = ' ';

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

Logger.prototype._transformArguments = function(arguments, level) {
  const baseMessage = {
    '@appId': this.appId,
    '@version': this.version,
    '@level': level
  };

  const textMessages = [];
  arguments.forEach(function(argument) {
    if (typeof argument === 'object') {
      objectKeys(argument).forEach(function(key) {
        baseMessage[key] = argument[key];
      });
    } else {
      textMessages.push(argument);
    }
  });

  if (textMessages.length > 0) {
    baseMessage.text = textMessages.join(TEXT_SEPARATOR);
  }

  return JSON.stringify(baseMessage);
};

logLevelHierarchy.forEach(function(logLevel) {
  Logger.prototype[logLevel] = function() {
    if (logLevelHierarchy.indexOf(this.logLevel) <= logLevelHierarchy.indexOf(logLevel)) {
      const message = this._transformArguments(objectValues(arguments), logLevel);
      switch (logLevel) {
        case LOG_LEVEL_DEBUG:
          console.log(message);
          break;
        case LOG_LEVEL_FATAL:
          console.error(message);
          break;
        default:
          console[logLevel](message);
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
