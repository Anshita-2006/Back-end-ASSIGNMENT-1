/**
 * Custom Logger Middleware
 * Logs Method, URL, and Timestamp for incoming requests
 */
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl || req.url;

  console.log(`[${timestamp}] ${method} ${url}`);
  next();
};

module.exports = logger;
