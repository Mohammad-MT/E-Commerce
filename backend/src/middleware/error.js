const logger = require("../utils/logger.js");

function errorHandler(err, req, res, next) {
  console.error(err); // Log error on console for debugging
  logger.error(err.message, err); //store logs in error.log file
  res.status(500).json({ error: "Something went wrong", details: err.message });
}

module.exports = errorHandler;
