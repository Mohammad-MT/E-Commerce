import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";

import {
  singupValidation,
  loginValidation,
  User,
} from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  //validation
  const { value, error } = singupValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const isEmailExist = await User.findOne({ email: value.email });
  if (isEmailExist)
    return res.status(400).json({ message: "email already exist!" });

  const isUserExist = await User.findOne({ username: value.username });
  if (isUserExist)
    return res.status(400).json({ message: "This username already exist!" });

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  // //generate profile
  // const profPic = `https://avatar.iran.liara.run/public/?username=${value.username}`;

  //create user
  const newUser = new User({
    fullname: value.fullname,
    username: value.username,
    email: value.email,
    password: hashedPassword,
  });

  if (newUser) {
    //set cookie with jwt token
    generateToken(
      {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      res
    );

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } else {
    res.status(400).json({ message: "Invalid user data!" });
  }
};

export const login = async (req, res) => {
  //validate
  const { value, error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ username: value.username });
  const isPasswordCorrect = await bcrypt.compare(
    value.password,
    user?.password || ""
  );

  if (!user || !isPasswordCorrect)
    return res.status(400).json({ message: "Invalid username or password" });

  generateToken(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    res
  );

  res.status(200).json({
    _id: user._id,
    username: user.username,
    profilePic: user.profilePic,
  });
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged  out successfully !" });
};

export const checkAuth = (req, res) => {
  res.status(200).json(req.user);
};

export const updateProfile = async (req, res) => {
  const userId = req.user._id;

  //** multer way dosen't work with read only filesystem hosts **//
  // const imagePath = `${req.protocol}://${req.get("host")}/uploads/${
  //   req.file.filename
  // }`;

  const { profilePic } = req.body;
  if (!profilePic) {
    return res.status(400).json({ message: "Profile pic is required" });
  }

  const uploadResponse = await cloudinary.uploader.upload(profilePic);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { profilePic: uploadResponse.secure_url },
    { new: true }
  );

  res.status(200).json(updatedUser);
};
