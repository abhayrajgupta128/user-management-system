import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cluster from "cluster";
import os from "os";
import { BaseRouter, UserRouter } from "./routes";
dotenv.config();

async function startServer() {
  const app = express();

  // Parse incoming JSON requests
  app.use(express.json());

  // CORS and security headers
  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
  }));
  app.use(helmet());

  // // Connect to MongoDB
  const dbUrl = process.env.MONGO_URL;
  if (!dbUrl) {
    throw new Error("MONGO_URL is not defined in the environment variables");
  }
  mongoose
    .connect(dbUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

  // Mount base routes
  app.use("/api", [BaseRouter, UserRouter]);

  // Global Error Handling Middleware
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (!err) return next();
    const statusCodes: { [key: string]: number } = {
      BadRequestError: 400,
      UnauthorizedError: 401,
      ForbiddenError: 403,
      NotFoundError: 404,
      ConflictError: 409,
    };
    const status = statusCodes[err.name] || 500;
    res.status(status).json({ status, message: err.message });
  });

  // 404 handler for undefined routes
  app.use((req: Request, res: Response) => {
    res.status(404).send("Not Found");
  });

  // Create and start the server
  const server = createServer(app);
  const PORT = process.env.PORT || 4000;

  server.on("error", (err: Error) => {
    console.error(err);
    process.exit(1);
  });

  // Check if the current process is the primary process
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    console.log(`Primary process is running with PID: ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork(); // Creates a worker for each core
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    // Worker processes will run the server
    server.listen(PORT, () => {
      console.log(`Worker process ${process.pid} is running on port ${PORT}`);
    });
  }
}

startServer();
