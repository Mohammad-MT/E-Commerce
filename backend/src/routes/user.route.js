import express from "express";
import {
  login,
  logout,
  signup,
  checkAuth,
  updateProfile,
} from "../controller/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/logout", logout);

route.get("/check", protectRoute, checkAuth);

route.put("/updateProfileImg", protectRoute, updateProfile);

export default route;
