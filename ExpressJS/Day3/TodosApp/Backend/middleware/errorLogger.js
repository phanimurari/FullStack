function errorLogger(err, req, res, next) {

  console.log("error in middleWare")
  console.error("❌ Error occurred:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    time: new Date().toISOString()
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
  });
}


module.exports = errorLogger;
