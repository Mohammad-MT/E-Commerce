const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).json({ error: "Forbidden - no token provided" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized - invalid Token" });
  }

  const user = await User.findById({ _id: decoded._id }).select("-password");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  req.user = user;

  next();
};

module.exports = protectRoute;
