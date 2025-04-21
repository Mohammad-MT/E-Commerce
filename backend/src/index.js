const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const connectToMongoDB = require("./db/connectToMongoDB.js");

const logger = require("./utils/logger.js");
const morgan = require("morgan");

const authRoute = require("./routes/user.route.js");
const productsRoute = require("./routes/products.route.js");
const orderRoutes = require("./routes/order.route.js");
const categoryRoutes = require("./routes/category.route.js");
const reviewRoutes = require("./routes/review.route.js");
const cartRoutes = require("./routes/cart.route.js");
const errorHandler = require("./middleware/error.js");

const dirname = path.resolve();

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
app.use("/uploads", express.static(path.join(dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on Port ${PORT}`);
});
