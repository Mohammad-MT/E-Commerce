import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoute from "./routes/user.route.js";
import productsRoute from "./routes/products.route.js";
import orderRoutes from "./routes/order.route.js";

const __dirname = path.resolve();

const app = express();
dotenv.config();

const PORT = process.env.PORT_SERVER || 3000;

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

app.use("/api/users/", authRoute);
app.use("/api/products/", productsRoute);
app.use("/api/orders/", orderRoutes);

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
