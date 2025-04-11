// logger.js
import winston from "winston";
import "winston-mongodb";
import dotenv from "dotenv";

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "info" }),
    new winston.transports.MongoDB({
      db: process.env.MONGO_DB_URL2,
      level: "info",
    }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// In production, log only warnings and errors to console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
