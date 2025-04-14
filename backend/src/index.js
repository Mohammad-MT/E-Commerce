import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import connectToMongoDB from "./db/connectToMongoDB.js";

import logger from "./utils/logger.js";
import morgan from "morgan";

import authRoute from "./routes/user.route.js";
import productsRoute from "./routes/products.route.js";
import orderRoutes from "./routes/order.route.js";
import categoryRoutes from "./routes/category.route.js";
import reviewRoutes from "./routes/review.route.js";
import cartRoutes from "./routes/cart.route.js";
import errorHandler from "./middleware/error.js";

const __dirname = path.resolve();

const app = express();
dotenv.config();

const PORT = process.env.PORT_SERVER || 3000;

process.on("uncaughtException", (error) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  logger.error(error.message, error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.log("WE GOT AN UNHANDELED REJECTION");
  logger.error(error.message, error);
  process.exit(1);
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        imgSrc: [
          "'self'",
          "data:",
          "https://res.cloudinary.com", // Cloudinary image domain
        ],
      },
    },
  })
);

// HTTP Request Logging
app.use(morgan("combined"));

app.use("/api/users/", authRoute);
app.use("/api/products/", productsRoute);
app.use("/api/carts/", cartRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/categories/", categoryRoutes);
app.use("/api/reviews/", reviewRoutes);

app.use(errorHandler);

// Middleware for serving static img files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on Port ${PORT}`);
});
