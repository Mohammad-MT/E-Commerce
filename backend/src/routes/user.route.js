import express from "express";
import {
  login,
  logout,
  signup,
  checkAuth,
  updateProfile,
} from "../controller/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import asyncMiddleware from "../middleware/async.js";

const route = express.Router();

route.post("/signup", asyncMiddleware(signup));
route.post("/login", asyncMiddleware(login));
route.post("/logout", asyncMiddleware(logout));

route.get("/check", protectRoute, asyncMiddleware(checkAuth));

route.post("/updateProfileImg", protectRoute, asyncMiddleware(updateProfile));

export default route;
