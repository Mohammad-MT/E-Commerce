const express = require("express");
const {
  login,
  logout,
  signup,
  checkAuth,
  updateProfile,
} = require("../controller/user.controller.js");
const protectRoute = require("../middleware/protectRoute.js");
const asyncMiddleware = require("../middleware/async.js");

const route = express.Router();

route.post("/signup", asyncMiddleware(signup));
route.post("/login", asyncMiddleware(login));
route.post("/logout", asyncMiddleware(logout));

route.get("/check", protectRoute, asyncMiddleware(checkAuth));

route.post("/updateProfileImg", protectRoute, asyncMiddleware(updateProfile));

module.exports = route;
