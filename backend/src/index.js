import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoute from "./routes/user.route.js";
import productsRoute from "./routes/products.route.js";
import orderRoutes from "./routes/order.route.js";

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
app.use(helmet());

app.use("/api/users/", authRoute);
app.use("/api/products/", productsRoute);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on Port ${PORT}`);
});
