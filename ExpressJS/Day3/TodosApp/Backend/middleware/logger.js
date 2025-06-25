function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); // Don't forget to call next(), or the request will hang!
}

module.exports = logger;
