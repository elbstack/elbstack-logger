# Simple logger for NodeJS

## What does it do?

This logger simply uses the Javascript `console` object to log messages in JSON format. The JSON will be transformed to a string by simply running `JSON.stringify` on it. If you log a text message the format will be:

```json
{
  "@appId": "elbstack-logs-test",
  "@version": "1.0.0",
  "@level": "info",
  "text": "This is a sample text"
}
```

If you log a JSON serializable object the format will be:

```json
{
  "@appId": "elbstack-logs-test",
  "@version": "1.0.0",
  "@level": "warn",
  "key1": "value1",
  "key2": 2
}
```

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
logger.info('This is a sample text');
```

## Usage with JSON serializable objects

```javascript
logger.info({ key1: 'value1', key2: 2 });
```

## Usage with both 

The logger simply accepts multiple arguments. All object type arguments will be merged straight away into the logged JSON from the right to the left. All arguments of other types will be merged to one string divided by spaces. That means that if you would do the following function call:

```js
logger.info({ key1: 'value1' }, 'abcdefg', { key1: 'value1Overwrite', anotherKey: 1 }, 5);
```

Then the result will be:

```json
{
  "@appId": "sample-app-id",
  "@version": "1.0.0",
  "@level": "info",
  "key1": "value1Overwrite",
  "anotherKey": 1,
  "text": "abcdefg 5"
}
```
