import mongoose from "mongoose";
import { config } from "./index";
import { logger } from "../utils";
import { MongoServerError } from "mongodb";
import { MongoClientOptions } from "mongodb";
const { MONGO_URI } = config.env;

export const connectDB = async (): Promise<void> => {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the configuration.");
  }
  const mongoClientOptions: MongoClientOptions = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 5000,
    maxPoolSize: 10,
    minPoolSize: 1,
  };
  try {
    await mongoose.connect(MONGO_URI, mongoClientOptions);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    if (error instanceof MongoServerError) {
      logger.error(`MongoDB connection error: ${error}`);
      process.exit(1);
    }
  }
};

export const closeDatabaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed.");
  } catch (error) {
    logger.error(`Error closing MongoDB connection: ${error}`);
    process.exit(1);
  }
};
