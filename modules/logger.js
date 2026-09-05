// modules/logger.js
// Custom module: simple logger used to print consistent log messages
// across the project. Demonstrates module.exports / require() reuse.

function log(message) {
  console.log(`[LOG]: ${message}`);
}

module.exports = log;
