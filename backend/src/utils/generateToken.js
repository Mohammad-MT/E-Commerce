import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = async (userInfo, res) => {
  //generate token
  const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //set token in cookie
  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
