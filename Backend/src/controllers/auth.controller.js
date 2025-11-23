import User from "../models/user.model.js";
import { registerUser } from "../services/auth.service.js";
import { findUserByEmailUsername } from "../dao/user.dao.js";
import { ApiError } from "../utils/ApiError.js";

// generate access token and Refresh Token
export const generateTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// register User
export const getRegister = async (req, res) => {
  const { username, email, name, password } = req.body;

  if (!name || !email || !password || !username) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  const existUser = await findUserByEmailUsername(email, username);
  console.log(existUser.length);

  if (existUser.length > 0) {
    return res.status(409).json({
      message: "Username or Email already exist",
      success: false,
    });
  }

  const user = await registerUser(name, username, email, password);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json({
    message: "Account created succesfully",
    success: true,
  });
};

// Login User

export const getLogin = async (req, res) => {
  const { email, password, username } = req.body;

  if ((!email && !username) || !password) {
    return res.status(400).json({
      meassage: "All fields are required",
      success: false,
    });
  }

  let user = await User.findOne({ $or: [{ email }, { username }] });
 

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
    });
  }

  const isPasswordValid = await user.isPasswordMatch(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
      success: false,
    });
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "Login successful",
      success: true,
      user: loggedInUser,
      accessToken,
      refreshToken,
    });
};

//logout user
export const logout_user = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiError(200, {}, "User logged Out"));
};

// get_curret_user
export const get_current_user = async (req, res) => {
  res.status(200).json({ user: req.user });
}
