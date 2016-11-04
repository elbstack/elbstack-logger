# Simple logger for NodeJS

## Installation

```bash
npm install --save elbstack-logger
```

## Usage

```javascript
const Logger = require('elbstack-logger');
const logger = new Logger('sample-app-id', '1.0.0', Logger.LOG_LEVEL_INFO);
```

## Log level hierarchy

```javascript
Logger.LOG_LEVEL_DEBUG
Logger.LOG_LEVEL_INFO
Logger.LOG_LEVEL_WARN
Logger.LOG_LEVEL_ERROR
Logger.LOG_LEVEL_FATAL
```

## Usage with text messages

```javascript
Logger.info('This is a sample text');
```

## Usage with JSON serializable objects

```javascript
Logger.info({ key: 'value' });
```
