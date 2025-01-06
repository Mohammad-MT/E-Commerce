import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoute from "./routes/auth.route.js";
import productsRoute from "./routes/products.route.js";
import usersRoute from "./routes/users.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT_SERVER || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5000/",
    credentials: true,
  })
);
app.use(helmet());

app.use("/api/auth/", authRoute);
app.use("/api/products/", productsRoute);
app.use("/api/users/", usersRoute);

app.get("/", (req, res) => {
  res.send("Test");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on Port ${PORT}`);
});
