import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import express, { Application } from "express";
import slowDown from "express-slow-down";
import { config } from "../config";
import { logger } from "../utils";

/**
 * Apply security middleware to the Express app.
 * @param app Express application instance
 */
const { SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT } = config.env;
export const applySecurityMiddleware = (app: Application): void => {
    const url = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;

  app.use(
    cors({
      origin: [url],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Use Helmet to set secure HTTP headers
  app.use(helmet());

  // Rate limiting to prevent DDoS attacks
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // Limit each IP to 1000 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    handler: (req, res) => {
      logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
      res.status(429).send("Too many requests, please try again later.");
    },

  });
  app.use(limiter);

  // Slow down requests after a threshold to mitigate bot attacks
  const speedLimiter = slowDown({
    windowMs: 1 * 60 * 1000, // 15 minutes
    delayAfter: 10, // Allow 100 requests per windowMs before slowing down
    delayMs: () => 500, // Add 500ms delay per request above the threshold
  });
//   app.use((req, res, next) => {
//     logger.info(`Slow down middleware triggered for IP: ${req.ip}`);
//     next();
//   })
  app.use(speedLimiter);

  // Body parser to handle large payloads
  app.use(express.json({ limit: "10kb" })); // Limit payload size to 10kb
  app.use(express.urlencoded({ extended: true, limit: "10kb" }));

  logger.info("Security middleware applied successfully.");
};
