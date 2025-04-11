import logger from "../utils/logger.js";

export default function errorHandler(err, req, res, next) {
  console.error(err); // Log error on console for debugging
  logger.error(err.message, err); //store logs in error.log file
  res.status(500).json({ error: "Something went wrong", details: err.message });
}
